const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const CATEGORY_EQUIPMENT_TABLE = 'Categorias_Maquinarias'

const CategoriesEquipmentsSchema = {
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
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class CategoriesEquipments extends Model {
  static associate(models) {
    this.hasMany(models.Categorias_Maquinarias_Relacion, {
      as: 'maquinarias',
      foreignKey: 'idCategoria'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_EQUIPMENT_TABLE,
      modelName: CATEGORY_EQUIPMENT_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  CategoriesEquipments,
  CategoriesEquipmentsSchema,
  CATEGORY_EQUIPMENT_TABLE
}
