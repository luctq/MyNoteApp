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
        return res.json({ status: 0, mes: 'Tài khoản không hợp lệ' })
      } else if (result.status === -1) {
        return res.json({ status: 0, mes: 'Có lỗi nào đó trong hệ thống' })
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
        return res.json({ status: 1, mes: 'Chia sẽ ghi chú thành công' })
      } else {
        return res.json({ status: 0, mes: 'Không thể chia sẻ cho chính mình' })
      }
    } catch (e) {
      console.log(e)
      return res.json({ status: 0, mes: 'Có lỗi nào đó trong hệ thống' })
    }
  }
}

module.exports = new ShareDataController()