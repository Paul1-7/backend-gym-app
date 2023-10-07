const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const { format } = require('date-fns')

async function listarProgramacion(query = '') {
  return await models.Programacion.findAll({
    include: ['entrenador', 'disciplina'],
    where: {
      ...query
    }
  })
}

async function contarCodigoProgramacion() {
  const today = format(new Date(), 'yyyyMMdd')
  const pattern = `PR-${today}%`
  return await models.Programacion.count({
    where: {
      codProgramacion: {
        [Op.like]: pattern
      }
    }
  })
}

async function listarProgramacionPersonalizada({ fechaInicio, fechaFin }) {
  const options = { include: ['entrenador', 'disciplina'] }
  const isRange = fechaInicio && fechaFin

  if (isRange) {
    options.where = {
      fecha: { [Op.between]: [fechaInicio, fechaFin] }
    }
  }

  options.where = {
    fecha: { [Op.gte]: fechaInicio }
  }

  return await models.Programacion.findAll(options)
}

async function buscarProgramacion(id) {
  return await models.Programacion.findByPk(id, {
    include: [
      'entrenador',
      'disciplina',
      'detalle',
      {
        association: 'detalle',
        include: [{ association: 'socio' }]
      }
    ]
  })
}

async function agregarProgramacion(programacion, options = {}) {
  return await (
    await models.Programacion.create(programacion, options)
  ).toJSON()
}

async function modificarProgramacion(id, cambio, options = {}) {
  return await models.Programacion?.update(cambio, { where: id, ...options })
}

module.exports = {
  listarProgramacion,
  buscarProgramacion,
  agregarProgramacion,
  modificarProgramacion,
  listarProgramacionPersonalizada,
  contarCodigoProgramacion
}
