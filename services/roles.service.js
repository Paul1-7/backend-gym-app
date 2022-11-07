const { models } = require('../libs/sequelize.js')

async function buscarRolPorNombre(nombre) {
  return await models.Roles.findOne({ where: { nombre } })
}

async function obtenerRoles() {
  return await models.Roles.findAll()
}

module.exports = {
  buscarRolPorNombre,
  obtenerRoles
}
