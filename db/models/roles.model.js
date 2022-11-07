const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const ROL_TABLE = 'Roles'

const RolSchema = {
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

class Rol extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_TABLE,
      modelName: ROL_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Rol, RolSchema, ROL_TABLE }
