const { Model, DataTypes } = require('sequelize')
const db = require('../../config/NoteDB')

const sequelize = db.sequelize

class User extends Model {

}

User.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  charset: 'utf8',
})

module.exports = User