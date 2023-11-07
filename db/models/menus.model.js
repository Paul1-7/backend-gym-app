const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const MENUS_TABLE = 'Menus'

const MenusSchema = {
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
    unique: true,
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

class Menus extends Model {
  static associate(models) {
    this.hasMany(models.Submenus, {
      as: 'submenus',
      foreignKey: 'idMenu'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MENUS_TABLE,
      modelName: MENUS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Menus, MenusSchema, MENUS_TABLE }
