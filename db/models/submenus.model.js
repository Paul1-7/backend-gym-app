const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { MENUS_TABLE } = require('./menus.model.js')
const SUBMENUS_TABLE = 'Submenus'

const SubmenusSchema = {
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
  },
  isMain: {
    type: DataTypes.BOOLEAN,
    field: 'is_main',
    allowNull: false
  },
  idMenu: {
    type: DataTypes.STRING,
    field: 'id_menu',
    references: {
      model: MENUS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Submenus extends Model {
  static associate(models) {
    this.belongsTo(models.Menus, {
      as: 'menu',
      foreignKey: 'idMenu'
    })

    this.belongsToMany(models.Roles, {
      as: 'submenus',
      through: models.Roles_Submenus,
      foreignKey: 'idSubmenu',
      otherKey: 'idRol'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBMENUS_TABLE,
      modelName: SUBMENUS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Submenus, SubmenusSchema, SUBMENUS_TABLE }
