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
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
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
