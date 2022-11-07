const { Model, DataTypes } = require('sequelize')
const { USUARIOS_TABLE } = require('./usuarios.model.js')
const { ROL_TABLE } = require('./roles.model.js')

const ROLES_USUARIOS_TABLE = 'Roles_Usuarios'

const RolesUsuariosSchema = {
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

class RolesUsuarios extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLES_USUARIOS_TABLE,
      modelName: ROLES_USUARIOS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { RolesUsuarios, RolesUsuariosSchema, ROLES_USUARIOS_TABLE }
