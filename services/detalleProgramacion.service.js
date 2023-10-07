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

module.exports = {
  agregarSocioProgramacion,
  eliminarSocioProgramacion
}
