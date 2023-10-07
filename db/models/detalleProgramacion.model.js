const { Model, DataTypes } = require('sequelize')
const { PROGRAMACION_TABLE } = require('./programacion.model.js')
const { USUARIOS_TABLE } = require('./usuarios.model.js')

const DETALLE_PROGRAMACION_TABLE = 'Detalle_Programacion'

const DetalleProgramacionSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    comment: 'identificador del registro',
    validate: {
      isUUID: 4
    }
  },
  idProgramacion: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador de la programacion',
    field: 'id_programacion',
    references: {
      model: PROGRAMACION_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idSocio: {
    allowNull: true,
    type: DataTypes.STRING,
    comment: 'identificador del socio',

    field: 'id_socio',
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class DetalleProgramacion extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, {
      foreignKey: 'idSocio',
      as: 'socio'
    })
    this.belongsTo(models.Programacion, {
      as: 'programacion',
      foreignKey: 'idProgramacion'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DETALLE_PROGRAMACION_TABLE,
      modelName: DETALLE_PROGRAMACION_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  DetalleProgramacion,
  DetalleProgramacionSchema,
  DETALLE_PROGRAMACION_TABLE
}
