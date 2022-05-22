const { Model, DataTypes } = require('sequelize')
const db = require('../../config/NoteDB')

const User = require('./User')

const sequelize = db.sequelize

class Folder extends Model {

}

Folder.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  noteCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  deleteTime: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Folder',
  tableName: 'folders',
  charset: 'utf8',
})

User.hasMany(Folder, {
  foreignKey: 'userId'
})

Folder.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = Folder