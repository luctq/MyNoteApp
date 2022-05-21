const User = require('../models/User')

class UserValidation {
  async validationUsername(username, tag) {
    if (!username) return { status: 0 } // Tài khoản không hợp lệ
    if (!username.match(/^[a-zA-Z0-9]{2,20}$/g)) return { status: 0 } // Tài khoản không hợp lệ
    try {
      await User.sync()
      const user = await User.findOne({
        where: {
          username: username,
        },
      })
      if (user) return { status: 1, user: user } // Tài khoản đã tồn tại
      else return { status: 2 } // Tài khoản chưa tồn tại
    } catch {
      return { status: -1 } // Lỗi hệ thống
    }
  }

  validationPassword(password) {
    if (!password) return false
    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
      )
    ) {
      return false
    }
    return true
  }
}

module.exports = new UserValidation()
