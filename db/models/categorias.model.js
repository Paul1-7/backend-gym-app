const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const CATEGORY_TABLE = 'Categorias'

const CategoriesSchema = {
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
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  tipo: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  }
}

class Categories extends Model {
  static associate(models) {
    this.hasMany(models.Categorias_Disciplinas, {
      as: 'disciplinas',
      foreignKey: 'idCategoria'
    })

    this.hasMany(models.Categorias_Productos, {
      as: 'productos',
      foreignKey: 'idCategoria'
    })
    this.hasMany(models.Categorias_Maquinarias, {
      as: 'maquinarias',
      foreignKey: 'idCategoria'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: CATEGORY_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Categories, CategoriesSchema, CATEGORY_TABLE }
