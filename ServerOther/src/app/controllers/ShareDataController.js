const Note = require('../models/Note')
const NoteShare = require('../models/NoteShare')
const { validationUsername } = require('../validations/UserValidation')

class ShareDataController {
  async shareNote(req, res) {
    try {
      await Note.sync()
      await NoteShare.sync()
      const { id, username } = req.body
      const note = await Note.findOne({
        where: {
          id
        }
      })
      const result = await validationUsername(username)
      if (result.status === 0) {
        return res.json({ status: 0, mes: 'This account is invalid' })
      } else if (result.status === -1) {
        return res.json({ status: 0, mes: 'An error has occurred in the system' })
      }
      if (username !== req.session.username) {
        const noteShare = await NoteShare.findOne({
          where: {
            noteId: id
          }
        })
        if (noteShare) {
          noteShare.setDataValue('userIds', noteShare.getDataValue('userIds').concat([username]))
        } else {
          const newNoteShare = await NoteShare.create({
            userIds: [username]
          })
          newNoteShare.setNote(note)
        }
        return res.json({ status: 1, mes: 'Share note success' })
      } else {
        return res.json({ status: 0, mes: 'Can not share your self' })
      }
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }
}

module.exports = new ShareDataController()