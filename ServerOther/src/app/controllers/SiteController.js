const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

const User = require('../models/User')
const { validationUsername, validationPassword } = require('../validations/UserValidation')

dotenv.config()

const { SALT_ROUND, SESS_NAME } = process.env

class SiteController {

  async register(req, res) {
    try {
      await User.sync()
      const { username, password } = req.body
      const result = await validationUsername(username, 'register')
      if (result.status === 0) {
        return res.json({ status: 0, mes: 'Tài khoản không hợp lệ' })
      } else if (result.status === 1) {
        return res.json({ status: 0, mes: 'Tài khoản đã tồn tại' })
      } else if (result.status === -1) {
        return res.json({ status: 0, mes: 'Có lỗi nào đó trong hệ thống' })
      }
      if (!validationPassword(password)) return res.json({ status: 0, mes: 'Mật khẩu không hợp lệ. Phải có một kí tự đặc biệt, in hoa, in thường, số, tối thiểu 8 kí tự.' })
      const hash = bcrypt.hashSync(password, parseInt(SALT_ROUND))
      await User.create({
        username: username,
        password: hash,
      })
      return res.json({ status: 1, mes: 'Đăng ký thành công' })
    } catch (e) {
      return res.json({ status: 0, mes: 'Có lỗi nào đó trong hệ thống' })
    }
  }

  async login(req, res) {
    try {
      await User.sync()
      const { username, password } = req.body
      var user = null
      const result = await validationUsername(username, 'login')
      if (result.status === 0 || result.status === 2) {
        return res.json({ status: 0, mes: 'Tài khoản không hợp lệ' })
      } else {
        user = result.user
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ status: 0, mes: 'Mật khẩu không hợp lệ' })
      }
      req.session.userId = user.userId
      req.session.username = user.username
      return res.json({ status: 1, mes: 'Đăng nhập thành công' })
    } catch (e) {
      return res.json({ status: 0, mes: 'Có lỗi nào đó trong hệ thống' })
    }
  }

  logout(req, res) {
    req.session.destroy(err => {
      if (err) return res.json({ status: 0, mes: 'Có lỗi nào đó trong hệ thống' })
      res.clearCookie(SESS_NAME)
      return res.json({ status: 1, mes: 'Đăng xuất thành công' })
    })
  }
}

module.exports = new SiteController()