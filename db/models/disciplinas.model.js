const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

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
  salon: {
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
  }
}

class Disciplinas extends Model {
  static associate(models) {
    this.belongsToMany(models.Usuarios, {
      //muchos a muchos
      as: 'usuarios',
      through: models.Horarios,
      foreignKey: 'idDisciplina',
      otherKey: 'idUsuario'
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
