const { Model, DataTypes } = require('sequelize')
const { CATEGORY_TABLE } = require('./categorias.model.js')
const { EQUIPMENT_TABLE } = require('./maquinarias.model.js')

const CATEGORIAS_MAQUINARIAS_TABLE = 'Categorias_Maquinarias'

const CategoriasMaquinariasSchema = {
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
  idMaquinaria: {
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'id_maquinaria',
    references: {
      model: EQUIPMENT_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class CategoriasMaquinarias extends Model {
  static associate(models) {
    this.belongsTo(models.Categorias, {
      foreignKey: 'idCategoria',
      as: 'categoria'
    })
    this.belongsTo(models.Maquinarias, {
      foreignKey: 'idMaquinaria',
      as: 'maquinaria'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIAS_MAQUINARIAS_TABLE,
      modelName: CATEGORIAS_MAQUINARIAS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  CategoriasMaquinarias,
  CategoriasMaquinariasSchema,
  CATEGORIAS_MAQUINARIAS_TABLE
}
