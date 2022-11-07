const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function obtenerUsuariosPorRol(active = false, ...rolNames) {
  const options = {
    where: {
      '$roles.nombre$': { [Op.in]: rolNames }
    },
    include: ['roles', 'horarios']
  }

  if (active) options.where.estado = 1

  return await models.Usuarios.findAll(options)
}

async function buscarUsuario(id) {
  return await models.Usuarios.findByPk(id, {
    include: ['roles']
  })
}

async function crearUsuario(User) {
  return await models.Usuarios.create(User)
}

async function actualizarUsuario(id, changes) {
  const { password } = changes

  const user = await models.Usuarios.findByPk(id)
  const newPassword =
    password.length === 0 ? JSON.stringify(user).password : password

  return await user?.update({ ...changes, password: newPassword })
}

async function borrarUsuario(id) {
  const user = await models.Usuarios.findByPk(id, {
    include: ['compras', 'ventasVendedor', 'ventasCliente', 'favoritos']
  })
  if (
    user.compras.length > 0 ||
    user.ventasVendedor.length > 0 ||
    user.ventasCliente.length > 0 ||
    user.favoritos.length > 0
  )
    return new Error(msg.msgErrorForeignKey)

  await removeRolUser(id)
  return await user?.destroy()
}

module.exports = {
  buscarUsuario,
  crearUsuario,
  actualizarUsuario,
  obtenerUsuariosPorRol,
  borrarUsuario
}
