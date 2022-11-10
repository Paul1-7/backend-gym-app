const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { HORARIOS_TABLE } = require('./horarios.model.js')
const { USUARIOS_TABLE } = require('./usuarios.model.js')
const PROGRAMACION_TABLE = 'Programacion'

const ProgramacionSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idSocio: {
    type: DataTypes.STRING,
    field: 'id_socio',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    },
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idHorario: {
    type: DataTypes.STRING,
    field: 'id_horario',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    },
    references: {
      model: HORARIOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Programacion extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROGRAMACION_TABLE,
      modelName: PROGRAMACION_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  Programacion,
  ProgramacionSchema,
  PROGRAMACION_TABLE
}
