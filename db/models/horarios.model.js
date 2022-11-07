const { Model, DataTypes } = require('sequelize')
const { DISCIPLINAS_TABLE } = require('./disciplinas.model.js')
const { ROOMS_TABLE } = require('./salones.model.js')
const { USUARIOS_TABLE } = require('./usuarios.model.js')

const HORARIOS_TABLE = 'Horarios'

const HorariosSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idUsuario: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_usuario',
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  idDisciplina: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_disciplina',
    references: {
      model: DISCIPLINAS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  horarioEntrada: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'horario_entrada'
  },
  horarioSalida: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'horario_salida'
  },
  idSalon: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_salon',
    references: {
      model: ROOMS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Horarios extends Model {
  static associate(models) {
    this.belongsTo(models.Salones, { as: 'horario', foreignKey: 'id' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HORARIOS_TABLE,
      modelName: HORARIOS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Horarios, HorariosSchema, HORARIOS_TABLE }
