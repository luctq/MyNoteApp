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
        return res.json({ status: 0, mes: 'This account is invalid' })
      } else if (result.status === 1) {
        return res.json({ status: 0, mes: 'Account already exists' })
      } else if (result.status === -1) {
        return res.json({ status: 0, mes: 'An error has occurred in the system' })
      }
      if (!validationPassword(password)) return res.json({ status: 0, mes: 'Invalid password' })
      const hash = bcrypt.hashSync(password, parseInt(SALT_ROUND))
      await User.create({
        username: username,
        password: hash,
      })
      return res.json({ status: 1, mes: 'Register success' })
    } catch (e) {
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  async login(req, res) {
    try {
      await User.sync()
      const { username, password } = req.body
      var user = null
      const result = await validationUsername(username, 'login')
      if (result.status === 0 || result.status === 2) {
        return res.json({ status: 0, mes: 'This account is invalid' })
      } else {
        user = result.user
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ status: 0, mes: 'Invalid password' })
      }
      req.session.userId = user.userId
      req.session.username = user.username
      return res.json({ status: 1, mes: 'Login success' })
    } catch (e) {
      return res.json({ status: 0, mes: 'An error has occurred in the system' })
    }
  }

  logout(req, res) {
    req.session.destroy(err => {
      if (err) return res.json({ status: 0, mes: 'An error has occurred in the system' })
      res.clearCookie(SESS_NAME)
      return res.json({ status: 1, mes: 'Logout success' })
    })
  }
}

module.exports = new SiteController()