const { models } = require('../libs/sequelize.js')

async function agregarSocioProgramacion(data, options = {}) {
  return await models.Detalle_Programacion.bulkCreate(data, options)
}

async function eliminarSocioProgramacion(idProgramacion, options = {}) {
  return await models.Detalle_Programacion.destroy({
    where: {
      idProgramacion
    },
    ...options
  })
}

async function modificarSocioProgramacion(idProgramacion, data, options = {}) {
  await eliminarSocioProgramacion(idProgramacion, options)
  await agregarSocioProgramacion(data, options)
}

module.exports = {
  agregarSocioProgramacion,
  eliminarSocioProgramacion,
  modificarSocioProgramacion
}
