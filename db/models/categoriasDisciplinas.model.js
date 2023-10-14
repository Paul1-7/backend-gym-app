const { Model, DataTypes } = require('sequelize')
const { CATEGORY_TABLE } = require('./categorias.model.js')
const { DISCIPLINAS_TABLE } = require('./disciplinas.model.js')

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
  idDisciplina: {
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'id_disciplina',
    references: {
      model: DISCIPLINAS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class CategoriasDisciplinas extends Model {
  static associate(models) {
    this.belongsTo(models.Categorias, {
      foreignKey: 'idCategoria',
      as: 'categoria'
    })
    this.belongsTo(models.Disciplinas, {
      foreignKey: 'idDisciplina',
      as: 'disciplina'
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
