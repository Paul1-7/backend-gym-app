const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { HORARIOS_TABLE } = require('./horarios.model.js')
const { USUARIOS_TABLE } = require('./usuarios.model.js')
const { DISCIPLINAS_TABLE } = require('./disciplinas.model.js')
const PROGRAMACION_TABLE = 'Programacion'

const ProgramacionSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  codProgramacion: {
    allowNull: false,
    comment: 'codigo de la programacion',
    type: DataTypes.STRING,
    field: 'cod_programacion'
  },
  cupoDisponible: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idEntrenador: {
    type: DataTypes.STRING,
    field: 'id_entrenador',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    },
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idHorario: {
    type: DataTypes.STRING,
    field: 'id_horario',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    },
    references: {
      model: HORARIOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idDisciplina: {
    type: DataTypes.STRING,
    field: 'id_disciplina',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    },
    references: {
      model: DISCIPLINAS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  }
}

class Programacion extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, {
      as: 'entrenador',
      foreignKey: 'idEntrenador'
    })

    this.belongsTo(models.Horarios, {
      as: 'horario',
      foreignKey: 'idHorario'
    })

    this.belongsTo(models.Disciplinas, {
      as: 'disciplina',
      foreignKey: 'idDisciplina'
    })

    this.hasMany(models.Detalle_Programacion, {
      foreignKey: 'idProgramacion',
      as: 'detalle'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROGRAMACION_TABLE,
      modelName: PROGRAMACION_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  Programacion,
  ProgramacionSchema,
  PROGRAMACION_TABLE
}
