const { models } = require('../libs/sequelize.js')

async function agregarRolUsuario(idUsuario, roles, options = {}) {
  const dataRolUser = []
  roles.forEach((role) => {
    dataRolUser.push({ idUsuario, ...role })
  })
  return await models.Roles_Usuarios.bulkCreate(dataRolUser, options)
}

async function eliminarRolUsuario(idUsuario, options = {}) {
  return await models.Roles_Usuarios.destroy({
    where: { idUsuario },
    ...options
  })
}

async function actualizarRolUsuario(idUsuario, roles, options = {}) {
  await eliminarRolUsuario(idUsuario, options)
  return await agregarRolUsuario(idUsuario, roles, options)
}

module.exports = {
  agregarRolUsuario,
  eliminarRolUsuario,
  actualizarRolUsuario
}
