const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg')
const CATEGORIAS_DISCIPLINAS_TABLE = 'Categorias_Disciplinas'

const CategoriasDisciplinasSchema = {
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

class CategoriasDisciplinas extends Model {
  static associate(models) {
    this.hasMany(models.Disciplinas, {
      as: 'disciplinas',
      foreignKey: 'idCategoria'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIAS_DISCIPLINAS_TABLE,
      modelName: CATEGORIAS_DISCIPLINAS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  CategoriasDisciplinas,
  CategoriasDisciplinasSchema,
  CATEGORIAS_DISCIPLINAS_TABLE
}
