const { Model, DataTypes } = require('sequelize')
const { PRODUCTOS_TABLE } = require('./productos.model.js')
const { CATEGORY_TABLE } = require('./categorias.model.js')

const CATEGORIAS_PRODUCTOS_TABLE = 'Categorias_Productos'

const CategoriasProductosSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idCategoria: {
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'id_categoria',
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  idProducto: {
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'id_producto',
    references: {
      model: PRODUCTOS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class CategoriasProductos extends Model {
  static associate(models) {
    this.belongsTo(models.Categorias, {
      foreignKey: 'idCategoria',
      as: 'categoria'
    })
    this.belongsTo(models.Productos, {
      foreignKey: 'idProducto',
      as: 'producto'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIAS_PRODUCTOS_TABLE,
      modelName: CATEGORIAS_PRODUCTOS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  CategoriasProductos,
  CategoriasProductosSchema,
  CATEGORIAS_PRODUCTOS_TABLE
}
