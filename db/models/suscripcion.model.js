const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { DISCIPLINAS_TABLE } = require('./disciplinas.model.js')
const { USUARIOS_TABLE } = require('./usuarios.model.js')
const SUSCRIPCION_TABLE = 'Suscripcion'

const SuscripcionSchema = {
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
  idDisciplina: {
    type: DataTypes.STRING,
    field: 'id_disciplina',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    },
    references: {
      model: DISCIPLINAS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  fechaInicio: {
    type: DataTypes.DATEONLY,
    field: 'fecha_inicio',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  planPago: {
    type: DataTypes.STRING,
    field: 'plan_pago',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  montoInscri: {
    type: DataTypes.INTEGER,
    field: 'monto_inscri',
    allowNull: false,
    validate: {
      isNumber: msg.isNumeric,
      notNull: msg.notNull
    }
  }
}

class Suscripcion extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUSCRIPCION_TABLE,
      modelName: SUSCRIPCION_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  Suscripcion,
  SuscripcionSchema,
  SUSCRIPCION_TABLE
}
