const { models } = require('../libs/sequelize.js')

async function agregarHorario(data, options = {}) {
  return await models.Horarios.create(data, options)
}

async function ListarHorarios() {
  return await models.Horarios.findAll({
    include: ['salon', 'disciplina', 'entrenador'],
    where: {
      estado: 1
    }
  })
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
  ListarHorarios
}
