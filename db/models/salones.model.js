const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const ROOMS_TABLE = 'Salones'

const RoomsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  codSalon: {
    field: 'cod_salon',
    type: DataTypes.STRING,
    allowNull: false
  },
  planta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
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

class Rooms extends Model {
  static associate(models) {
    this.hasMany(models.Horarios, {
      as: 'horarios',
      foreignKey: 'idSalon'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROOMS_TABLE,
      modelName: ROOMS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Rooms, RoomsSchema, ROOMS_TABLE }
