const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTOS_TABLE } = require('./productos.model.js')
const { VENTAS_TABLE } = require('./ventas.model.js')

const DETALLE_VENTAS_TABLE = 'Detalle_Ventas'

const DetalleVentasSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    comment: 'identificador del registro',
    validate: {
      isUUID: 4
    }
  },
  idVenta: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador de la venta',

    field: 'id_venta',
    references: {
      model: VENTAS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idProd: {
    allowNull: true,
    type: DataTypes.STRING,
    comment: 'identificador del producto',

    field: 'id_prod',
    references: {
      model: PRODUCTOS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  cantidad: {
    type: DataTypes.INTEGER,
    comment: 'cantidad del producto',

    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  precioAdquirido: {
    type: DataTypes.FLOAT,
    field: 'precio_adquirido',
    comment: 'precio adquirido del producto',

    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  }
}

class DetalleVentas extends Model {
  static associate(models) {
    this.belongsTo(models.Ventas, {
      as: 'venta',
      foreignKey: 'idVenta'
    })
    this.belongsTo(models.Productos, {
      as: 'productos',
      foreignKey: 'idProd'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DETALLE_VENTAS_TABLE,
      modelName: DETALLE_VENTAS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  DetalleVentas,
  DetalleVentasSchema,
  DETALLE_VENTAS_TABLE
}
