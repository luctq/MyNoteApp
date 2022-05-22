const { Model, DataTypes } = require('sequelize')
const { Buffer } = require('node:buffer')

const db = require('../../config/NoteDB')
const Folder = require('./Folder')

const sequelize = db.sequelize

class Note extends Model {

}

Note.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  lastEdit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  theme: {
    type: DataTypes.STRING,
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