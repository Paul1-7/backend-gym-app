const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const PLANES_TABLE = 'Planes'

const PlanesSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  fechaVencimiento: {
    field: 'fecha_vencimiento',
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  esRecurrente: {
    type: DataTypes.INTEGER,
    field: 'es_recurrente',
    allowNull: false,
    validate: {
      notNull: msg.notNull,
      isNumeric: msg.isNumeric
    }
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

class Planes extends Model {
  static associate(models) {
    this.hasMany(models.Suscripciones, {
      as: 'suscripciones',
      foreignKey: 'idPlan'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLANES_TABLE,
      modelName: PLANES_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  Planes,
  PlanesSchema,
  PLANES_TABLE
}
