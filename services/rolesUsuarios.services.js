const { models } = require('../libs/sequelize.js')

async function agregarRolUsuario(idUsuario, roles) {
  const dataRolUser = []
  roles.forEach((role) => {
    dataRolUser.push({ idUsuario, ...role })
  })

  return await models.Roles_Usuarios.bulkCreate(dataRolUser)
}

async function eliminarRolUsuario(idUsuario) {
  return await models.Roles_Usuarios.destroy({
    where: { idUsuario }
  })
}

async function actualizarRolUsuario(idUsuario, roles) {
  await eliminarRolUsuario(idUsuario)
  return await agregarRolUsuario(idUsuario, roles)
}

module.exports = {
  agregarRolUsuario,
  eliminarRolUsuario,
  actualizarRolUsuario
}
