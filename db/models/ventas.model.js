const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { USUARIOS_TABLE } = require('./usuarios.model.js')

const VENTAS_TABLE = 'Ventas'

const VentasSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  codVenta: {
    allowNull: false,
    comment: 'codigo de la venta',
    type: DataTypes.STRING,
    field: 'cod_venta'
  },
  fecha: {
    comment: 'fecha de la venta',
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: msg.isDate
    }
  },
  idSocio: {
    comment: 'identificador del socio',
    type: DataTypes.STRING,
    field: 'id_socio',
    allowNull: true,
    validate: {
      isUUID: 4
    },
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idVendedor: {
    type: DataTypes.STRING,
    comment: 'identificador del vendedor',

    field: 'id_vendedor',
    allowNull: true,
    validate: {
      isUUID: 4
    },
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: msg.isFloat
    }
  }
}

class Ventas extends Model {
  static associate(models) {
    this.hasMany(models.Detalle_Ventas, {
      foreignKey: 'idVenta',
      as: 'detalle'
    })
    this.belongsTo(models.Usuarios, {
      foreignKey: 'idVendedor',
      as: 'vendedor',
      targetKey: 'id'
    })
    this.belongsTo(models.Usuarios, {
      foreignKey: 'idSocio',
      as: 'socio',
      targetKey: 'id'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VENTAS_TABLE,
      modelName: VENTAS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  Ventas,
  VentasSchema,
  VENTAS_TABLE
}
