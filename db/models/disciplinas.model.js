const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { CATEGORY_TABLE } = require('./categorias.model.js')

const DISCIPLINAS_TABLE = 'Disciplinas'

const DisciplinasSchema = {
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
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  descripcion: {
    type: DataTypes.STRING,
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
  },
  idCategoria: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_cat',
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Disciplinas extends Model {
  static associate(models) {
    this.hasMany(models.Horarios, {
      //muchos a muchos
      as: 'horarios',
      foreignKey: 'idDisciplina'
    })

    this.belongsTo(models.Categorias, {
      foreignKey: 'idCategoria',
      as: 'categoria',
      targetKey: 'id'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DISCIPLINAS_TABLE,
      modelName: DISCIPLINAS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Disciplinas, DisciplinasSchema, DISCIPLINAS_TABLE }
