const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PLANES_TABLE } = require('./planes.model.js')
const { USUARIOS_TABLE } = require('./usuarios.model.js')
const SUSCRIPCION_TABLE = 'Suscripciones'

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
  idPlan: {
    type: DataTypes.STRING,
    field: 'id_plan',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    },
    references: {
      model: PLANES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  fechaInicio: {
    type: DataTypes.DATE,
    field: 'fecha_inicio',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  fechaFin: {
    type: DataTypes.DATE,
    field: 'fecha_fin',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  montoCancelado: {
    type: DataTypes.FLOAT,
    field: 'monto_cancelado',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
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
  diasExtras: {
    field:'dias_extras',
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}

class Suscripcion extends Model {
  static associate(models) {
    this.belongsTo(models.Planes, {
      as: 'plan',
      foreignKey: 'idPlan'
    })
    this.belongsTo(models.Usuarios, {
      as: 'socio',
      foreignKey: 'idSocio'
    })
  }

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
