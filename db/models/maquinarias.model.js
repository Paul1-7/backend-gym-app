const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const EQUIPMENT_TABLE = 'Maquinarias'

const EquipmentSchema = {
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
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  fechaAdquisicion: {
    type: DataTypes.DATE,
    field: 'fecha_adquisicion',
    allowNull: false
  },
  capacidad: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  codMaquinaria: {
    field: 'cod_maquinaria',
    type: DataTypes.TEXT,
    allowNull: false
  },
  estado: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  borrado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}

class Equipment extends Model {
  static associate(models) {
    this.hasMany(models.Categorias_Maquinarias, {
      as: 'categorias',
      foreignKey: 'idMaquinaria'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EQUIPMENT_TABLE,
      modelName: EQUIPMENT_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Equipment, EquipmentSchema, EQUIPMENT_TABLE }
