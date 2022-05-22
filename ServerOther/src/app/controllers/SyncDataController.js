const { Buffer } = require('node:buffer')
const fs = require('fs')

const Folder = require('../models/Folder')
const Note = require('../models/Note')
const User = require('../models/User')
const NoteShare = require('../models/NoteShare')

class SyncDataController {
  async uploadData(req, res) {
    const { folders, notes } = req.body
    await User.sync()
    const user = await User.findOne({
      where: {
        userId: req.session.userId
      }
    })
    await Folder.sync()
    await Folder.destroy({
      where: {
        userId: req.session.userId
      }
    })
    try {
      for (const folder of folders) {
        await Note.sync()
        const newFolder = await Folder.create({
          name: folder.name,
          noteCount: folder.noteCount,
          deleteTime: folder.deleteTime,
          isDeleted: folder.isDeleted
        })
        const notesInFolder = notes.filter(note => {
          return note.folderId === folder.id
        })
        for (const note of notesInFolder) {
          const regex = /src="(data:image\/png;base64,|data:audio\/mp4;base64,)([+:/=;,A-Za-z\s0-9]+)"/g
          var m, output = []
          do {
            m = regex.exec(note.content)
            if (m) {
              output.push({ type: m[1], data: m[2] })
            }
          } while (m)
          let i = 0
          for (const r of output) {
            i++
            if (r.type === 'data:image/png;base64,') {
              const regex1 = /data:image\/png;base64,([+:/=;,A-Za-z\s0-9]+)/
              fs.writeFile(`./public/images/${note.lastEdit}${i}.png`, r.data, 'base64', (err) => {
                if (err) return console.error(err);
                console.log('File saved')
              })
              note.content = note.content.replace(regex1, `http://192.168.113.107:8080/images/${note.lastEdit}${i}.png`)
            }
            if (r.type === 'data:audio/mp4;base64,') {
              const regex1 = /data:audio\/mp4;base64,([+:/=;,A-Za-z\s0-9]+)/
              fs.writeFile(`./public/audios/${note.lastEdit}${i}.mp4`, r.data, 'base64', (err) => {
                if (err) return console.error(err);
                console.log('File saved')
              })
              note.content = note.content.replace(regex1, `http://192.168.113.107:8080/audios/${note.lastEdit}${i}.mp4`)
            }
          }
          const newNote = await Note.create({
            title: note.title,
            content: note.content,
            lastEdit: note.lastEdit,
            isDeleted: note.isDeleted,
            theme: note.theme
          })
          newFolder.addNotes(newNote)
        }
        user.addFolders(newFolder)
      }
      await new Promise(resolve => setTimeout(resolve, 2000))
      return res.json({ status: 1, mes: 'Sync data success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async downloadData(req, res) {
    try {
      await User.sync()
      const user = await User.findOne({
        where: {
          userId: req.session.userId
        }
      })
      await Folder.sync()
      let folders = await user.getFolders()
      let result = []
      const nextFolderId = folders.length === 0 ? 0 : folders[folders.length - 1].id + 1
      await Note.sync()
      await NoteShare.sync()
      const noteShares = await NoteShare.findAll()
      for (const noteShare of noteShares) {
        if (noteShare.getDataValue('userIds').includes(req.session.username))  {
          const note = await noteShare.getNote()
          note.folderId = nextFolderId
          note.dataValues.isNoteShare = true
          result.push(note)
        }
      }
      let notes = []
      for (const folder of folders) {
        notes = notes.concat(await folder.getNotes())
      }
      if (result.length !== 0) {
        folders.push({ id: nextFolderId, name: 'Thư mục chia sẻ', noteCount: result.length, isDeleted: false, deleteTime: null  })
      }
      notes = notes.concat(result)
      await new Promise(resolve => setTimeout(resolve, 2000))
      return res.json({ status: 1, mes: 'Download data success', data: {folders, notes} })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async changeTheme(req, res) {
    const { id, theme, lastEdit } = req.body
    try {
      const note = await Note.findOne({
        where: {
          id
        }
      })
      const folder = await Folder.findOne({
        where: {
          id: note.folderId
        }
      })
      if (folder.userId === req.session.userId) {
        await Note.update({
          theme: theme,
          lastEdit: lastEdit
        }, {
          where: {
            id
          }
        })
      }
      return res.json({ status: 1, mes: 'Change theme success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async createNewNote(req, res) {
    const { note } = req.body
    try {
      //bug
      console.log(note)
      const folder = await Folder.findOne({
        where: {
          id: note.folderId
        }
      })
      if (folder.userId === req.session.userId) {
        const newNote = await Note.create({
          id: note.id,
          title: note.title,
          content: note.content,
          lastEdit: note.lastEdit,
          isDeleted: note.isDeleted,
          theme: note.theme
        })
        folder.addNotes(newNote)
        await Folder.update({
          noteCount: folder.noteCount + 1
        }, {
          where: {
            id: folder.id
          }
        })
        return res.json({ status: 1, mes: 'Add note success', id: newNote.id })
      } else {
        return res.json({ status: 0, mes: 'Access denied' })
      }
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async deleteNote(req, res) {
    const { id } = req.body
    try {
      const note = await Note.findOne({
        where: {
          id
        }
      })
      const folder = await Folder.findOne({
        where: {
          id: note.folderId
        }
      })
      if (folder.userId === req.session.userId) {
        await Note.update({
          isDeleted: true
        }, {
          where: {
            id
          }
        })
        await Folder.update({
          noteCount: folder.noteCount - 1
        }, {
          where: {
            id: folder.id
          }
        })
      }
      return res.json({ status: 1, mes: 'Delete note success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async restoreNote(req, res) {
    const { id } = req.body
    try {
      const note = await Note.findOne({
        where: {
          id
        }
      })
      const folder = await Folder.findOne({
        where: {
          id: note.folderId
        }
      })
      if (folder.userId === req.session.userId) {
        if (folder.isDeleted === true) {
          await Folder.update({
            isDeleted: false,
            noteCount: 1
          }, {
            where: {
              id: note.folderId
            }
          })
        } else {
          await Folder.update({
            noteCount: folder.noteCount + 1
          }, {
            where: {
              id: note.folderId
            }
          })
        }
        await Note.update({
          isDeleted: false
        }, {
          where: {
            id
          }
        })
      }
      return res.json({ status: 1, mes: 'Restore note success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async expulsionNote(req, res) {
    const { id } = req.body
    try {
      const note = await Note.findOne({
        where: {
          id
        }
      })
      const folder = await Folder.findOne({
        where: {
          id: note.folderId
        }
      })
      if (folder.userId === req.session.userId) {
        await Note.destroy({
          where: {
            id
          }
        })
        await Folder.update({
          noteCount: folder.noteCount - 1
        }, {
          where: {
            id: note.folderId
          }
        })
      }
      return res.json({ status: 1, mes: 'Expulsion note success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async updateNote(req, res) {
    const { note } = req.body
    try {
      const folder = await Folder.findOne({
        where: {
          id: note.folderId
        }
      })
      if (folder.userId === req.session.userId) {
        const regex = /src="(data:image\/png;base64,|data:audio\/mp4;base64,)([+:/=;,A-Za-z\s0-9]+)"/g
        var m, output = []
        do {
          m = regex.exec(note.content)
          if (m) {
            output.push({ type: m[1], data: m[2] })
          }
        } while (m)
        let i = 0
        for (const r of output) {
          i++
          if (r.type === 'data:image/png;base64,') {
            const regex1 = /data:image\/png;base64,([+:/=;,A-Za-z\s0-9]+)/
            fs.writeFile(`./public/images/${note.lastEdit}${i}.png`, r.data, 'base64', (err) => {
              if (err) return console.error(err);
              console.log('File saved')
            })
            note.content = note.content.replace(regex1, `http://192.168.113.107:8080/images/${note.lastEdit}${i}.png`)
          }
          if (r.type === 'data:audio/mp4;base64,') {
            const regex1 = /data:audio\/mp4;base64,([+:/=;,A-Za-z\s0-9]+)/
            fs.writeFile(`./public/audios/${note.lastEdit}${i}.mp4`, r.data, 'base64', (err) => {
              if (err) return console.error(err);
              console.log('File saved')
            })
            note.content = note.content.replace(regex1, `http://192.168.113.107:8080/audios/${note.lastEdit}${i}.mp4`)
          }
        }
        await Note.update({
          title: note.title,
          content: note.content,
          lastEdit: note.lastEdit
        }, {
          where: {
            id: note.id
          }
        })
      }
      return res.json({ status: 1, mes: 'Update note success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async createNewFolder(req, res) {
    const { folder } = req.body
    try {
      const user = await User.findOne({
        where: {
          userId: req.session.userId
        }
      })
      const newFolder = await Folder.create({
        id: folder.id,
        name: folder.name,
        noteCount: folder.noteCount,
        isDeleted: folder.isDeleted,
        deleteTime: folder.deleteTime
      })
      user.addFolders(newFolder)
      return res.json({ status: 1, mes: 'Create new folder success', id: newFolder.id })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async deleteFolder(req, res) {
    const { id } = req.body
    try {
      const folder = await Folder.findOne({
        where: {
          id
        }
      })
      if (!folder) {
        return res.json({ status: 1, mes: 'Delete folder success' })
      }
      if (folder.userId === req.session.userId) {
        if (folder.noteCount === 0) {
          await Folder.destroy({
            where: {
              id
            }
          })
        } else {
          await Folder.update({
            isDeleted: true
          }, {
            where: {
              id
            }
          })
          await Note.update({
            isDeleted: true
          }, {
            where: {
              folderId: id
            }
          })
        }
      }
      return res.json({ status: 1, mes: 'Delete folder success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }
}

module.exports = new SyncDataController()