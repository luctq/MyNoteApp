const { Model, DataTypes } = require('sequelize')
const db = require('../../config/NoteDB')

const Note = require('./Note')

const sequelize = db.sequelize

class NoteShare extends Model {

}

NoteShare.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  userIds: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('userIds').split(';')
    },
    set(val) {
      this.setDataValue('userIds', val.join(';'))
    }
  }
}, {
  sequelize,
  modelName: 'NoteShare',
  tableName: 'noteshares',
  charset: 'utf8',
})

Note.hasOne(NoteShare, {
  foreignKey: 'noteId',
  onDelete: 'CASCADE'
})

NoteShare.belongsTo(Note, {
  foreignKey: 'noteId'
})

module.exports = NoteShare