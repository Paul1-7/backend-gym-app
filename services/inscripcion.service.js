const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function AgregarInscripcion(data) {
  return await models.Inscripcion.bulkCreate(data)
}

async function EliminarInscripcion(CodSocios) {
  return await models.Inscripcion.destroy({
    where: {
      CodSocios
    }
  })
}

async function ModificarInscripcion(CodSocios, data) {
  const removed = await EliminarInscripcion(CodSocios)
  const result = removed > 0 ? await models.Inscripcion.bulkCreate(data) : null
  return result
}

module.exports = {
  AgregarInscripcion,
  EliminarInscripcion,
  ModificarInscripcion
}
