const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { CATEGORY_TABLE } = require('./categorias.model.js')

const PRODUCTOS_TABLE = 'Productos'

const ProductosSchema = {
  id: {
    type: DataTypes.STRING,
    comment: 'identificador del registro',

    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.STRING,
    comment: 'nombre del producto',

    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    comment: 'cantidad del producto',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  precioCompra: {
    type: DataTypes.FLOAT,
    field: 'precio_compra',
    comment: 'precio de compra del producto',

    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull,
      isGreaterThanOrEqual(value) {
        if (parseFloat(value) <= 0) {
          throw new Error(msg.msgPositiveNumber)
        }
      }
    }
  },
  precioVenta: {
    type: DataTypes.FLOAT,
    field: 'precio_venta',
    comment: 'precio de venta del producto',

    allowNull: true,
    validate: {
      isFloat: msg.isFloat,
      isGreaterThan(value) {
        if (parseInt(value) < parseInt(this.precioCompra)) {
          throw new Error(msg.msgIsGreaterThan)
        }
      }
    }
  },
  fechaVencimiento: {
    type: DataTypes.DATE,
    comment: 'fecha de vencimiento del producto',
    field: 'fecha_vencimiento',
    allowNull: true,
    validate: {
      isDate: msg.isDate
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado del producto',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  },
  tieneVencimiento: {
    field: 'tiene_vencimiento',
    type: DataTypes.BOOLEAN,
    comment: 'informacion si tine vencimiento producto',
    allowNull: false
  }
}

class Productos extends Model {
  static associate(models) {
    this.hasMany(models.Detalle_Ventas, {
      as: 'detalleVentas',
      foreignKey: 'id'
    })

    this.hasMany(models.Categorias_Productos, {
      as: 'categorias',
      foreignKey: 'idProducto'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTOS_TABLE,
      modelName: PRODUCTOS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  Productos,
  ProductosSchema,
  PRODUCTOS_TABLE
}
