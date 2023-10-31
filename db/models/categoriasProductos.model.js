const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg')
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
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
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

class CategoriasProductos extends Model {
  static associate(models) {
    this.hasMany(models.Productos, {
      foreignKey: 'idCategoria',
      as: 'productos'
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
