
const Folder = require('../models/Folder')
const Note = require('../models/Note')
const User = require('../models/User')
const NoteShare = require('../models/NoteShare')

class SyncDataController {
  async uploadData(req, res) {
    const { folders, notes } = req.body
    const user = await User.findOne({
      where: {
        userId: req.session.userId
      }
    })
    await Folder.destroy({
      where: {
        userId: req.session.userId
      }
    })
    try {
      for (const folder of folders) {
        await Folder.sync()
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
          await Note.sync()
          const newNote = await Note.create({
            title: note.title,
            content: note.content,
            lastEdit: note.lastEdit,
            isDeleted: note.isDeleted,
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
      const user = await User.findOne({
        where: {
          userId: req.session.userId
        }
      })
      let folders = await user.getFolders()
      let result = []
      const nextFolderId = folders.length === 0 ? 0 : folders[folders.length - 1].id + 1
      const noteShares = await NoteShare.findAll()
      for (const noteShare of noteShares) {
        if (noteShare.getDataValue('userIds').includes(req.session.username))  {
          const note = await noteShare.getNote()
          note.folderId = nextFolderId
          note.isNoteShare = true
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

  async createNewNote(req, res) {
    const { note } = req.body
    try {
      const folder = await Folder.findOne({
        where: {
          folderId: note.folderId
        }
      })
      const newNote = await Note.create({
        noteTitle: note.noteTitle,
        noteContent: note.noteContent,
        lastEdit: note.lastEdit,
        isDeleted: note.isDeleted
      })
      folder.addNotes(newNote)
      return res.json({ status: 1, mes: 'Add note success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async deleteNote(req, res) {
    const { noteId } = req.body
    try {
      await Note.update({
        isDeleted: true
      }, {
        where: {
          noteId
        }
      })
      return res.json({ status: 1, mes: 'Delete note success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async restoreNote(req, res) {
    const { noteId } = req.body
    try {
      await Note.update({
        isDeleted: false
      }, {
        where: {
          noteId
        }
      })
      return res.json({ status: 1, mes: 'Restore note success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async updateNote(req, res) {
    const { note } = req.body
    try {
      await Note.update({
        noteTitle: note.noteTitle,
        noteContent: note.noteContent,
        lastEdit: note.lastEdit
      }, {
        where: note.noteId
      })
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
        folderName: folder.folderName,
        noteCount: folder.noteCount,
        isDeleted: folder.isDeleted,
        deleteTime: folder.deleteTime
      })
      user.addFolders(newFolder)
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async deleteFolder(req, res) {
    const { folderId } = req.body
    try {
      await Folder.update({
        isDeleted: true
      }, {
        where: {
          folderId
        }
      })
      return res.json({ status: 1, mes: 'Delete folder success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async restoreFolder(req, res) {
    const { folderId } = req.body
    try {
      await Folder.update({
        isDeleted: false
      }, {
        where: {
          folderId
        }
      })
      return res.json({ status: 1, mes: 'Restore folder success' })
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }
}

module.exports = new SyncDataController()