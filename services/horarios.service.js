const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const { add } = require('date-fns')

async function agregarHorario(data, options = {}) {
  return await models.Horarios.create(data, options)
}

async function ListarHorarios(query = '') {
  return await models.Horarios.findAll({
    include: ['salon', 'disciplina', 'entrenador'],
    where: {
      estado: 1,
      ...query
    }
  })
}

async function verificarDisponibilidad(horarioEntrada, horarioSalida) {
  const registrosIntersectados = await models.Horarios.findAll({
    where: {
      [Op.or]: [
        {
          horarioEntrada: {
            [Op.lt]: horarioSalida
          },
          horarioSalida: {
            [Op.gt]: horarioEntrada
          }
        }
      ]
    }
  })

  return registrosIntersectados.map((item) => item.toJSON())
}

async function eliminarHorarios(id) {
  const schedule = await models.Horarios.findByPk(id)
  return schedule.update({ estado: 0 })
}

async function buscarHorario(id) {
  return await models.Horarios.findAll({
    where: {
      idUsuario: id
    }
  })
}

async function modificarHorarios(id, data) {
  const schedule = await models.Horarios.findByPk(id)
  return schedule.update(data)
}

module.exports = {
  agregarHorario,
  buscarHorario,
  eliminarHorarios,
  modificarHorarios,
  ListarHorarios,
  verificarDisponibilidad
}
