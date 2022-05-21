const { Model, DataTypes } = require('sequelize')
const db = require('../../config/NoteDB')

const Folder = require('./Folder')

const sequelize = db.sequelize

class Note extends Model {

}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastEdit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Note',
  tableName: 'notes',
  charset: 'utf8',
})

Folder.hasMany(Note, {
  foreignKey: 'folderId',
  onDelete: 'CASCADE'
})

Note.belongsTo(Folder, {
  foreignKey: 'folderId'
})

module.exports = Note