const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const USUARIOS_TABLE = 'Usuarios'

const UsuariosSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
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
  apellidoP: {
    type: DataTypes.STRING,
    field: 'apellido_p',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  apellidoM: {
    type: DataTypes.STRING,
    field: 'apellido_m',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      is: msg.isAlphanumeric
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
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

class Usuarios extends Model {
  static associate(models) {
    this.belongsToMany(models.Roles, {
      as: 'roles',
      through: models.Roles_Usuarios,
      foreignKey: 'idUsuario',
      otherKey: 'idRol'
    })
    this.hasMany(models.Suscripciones, {
      as: 'suscripciones',
      foreignKey: 'idSocio'
    })
    this.hasMany(models.Horarios, {
      as: 'horarios',
      foreignKey: 'idEntrenador'
    })

    this.hasMany(models.Programacion, {
      as: 'programacion',
      foreignKey: 'idSocio'
    })

    this.hasMany(models.Ventas, {
      foreignKey: 'idVendedor',
      sourceKey: 'id',
      as: 'ventasVendedor'
    })
    this.hasMany(models.Ventas, {
      foreignKey: 'idSocio',
      sourceKey: 'id',
      as: 'ventasSocios'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIOS_TABLE,
      modelName: USUARIOS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Usuarios, UsuariosSchema, USUARIOS_TABLE }
