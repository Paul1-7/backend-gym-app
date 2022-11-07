const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function agregarHorario(data) {
  return await models.Horarios.bulkCreate(data)
}

async function eliminarHorarios(CodSocios) {
  return await models.Horarios.destroy({
    where: {
      CodSocios
    }
  })
}

async function buscarHorario(id) {
  return await models.Horarios.findAll({
    where: {
      idUsuario: id
    }
  })
}

async function modificarHorarios(CodSocios, data) {
  const removed = await eliminarHorarios(CodSocios)
  const result = removed > 0 ? await models.Horarios.bulkCreate(data) : null
  return result
}

module.exports = {
  agregarHorario,
  buscarHorario,
  eliminarHorarios,
  modificarHorarios
}
