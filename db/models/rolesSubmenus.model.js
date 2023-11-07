const { Model, DataTypes } = require('sequelize')
const { SUBMENUS_TABLE } = require('./submenus.model.js')
const { ROL_TABLE } = require('./roles.model.js')

const ROLES_SUBMENUS_TABLE = 'Roles_Submenus'

const RolesSubmenusSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idSubmenu: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_submenu',
    references: {
      model: SUBMENUS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idRol: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_rol',
    references: {
      model: ROL_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class RolesSubmenus extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLES_SUBMENUS_TABLE,
      modelName: ROLES_SUBMENUS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { RolesSubmenus, RolesSubmenusSchema, ROLES_SUBMENUS_TABLE }
