const { Sequelize } = require('sequelize')

class NoteDB {
  constructor(dbName, username, password) {
    this.sequelize = new Sequelize(dbName, username, password, {
      host: 'localhost',
      dialect: 'mysql',
      logging: false
    })
  }

  async connectDB() {
    try {
      await this.sequelize.authenticate()
      console.log('--------->Connect to note database success!')
      return Promise.resolve()
    } catch {
      return Promise.reject()
    }
  }
}

module.exports = new NoteDB('notes', 'root', null)