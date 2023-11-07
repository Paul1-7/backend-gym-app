const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
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
  horaEntrada: {
    allowNull: false,
    type: DataTypes.TIME,
    field: 'hora_entrada'
  },
  horaSalida: {
    allowNull: false,
    type: DataTypes.TIME,
    field: 'hora_salida'
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
  },
  idEntrenador: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_entrenador',
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  dia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Horarios extends Model {
  static associate(models) {
    this.belongsTo(models.Salones, { as: 'salon', foreignKey: 'idSalon' })
    this.belongsTo(models.Disciplinas, {
      as: 'disciplina',
      foreignKey: 'idDisciplina'
    })

    this.hasMany(models.Programacion, {
      as: 'programaciones',
      foreignKey: 'idHorario'
    })

    this.belongsTo(models.Usuarios, {
      as: 'entrenador',
      foreignKey: 'idEntrenador'
    })
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
