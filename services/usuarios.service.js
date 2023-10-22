const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')
const { eliminarRolUsuario } = require('./rolesUsuarios.services')
const { hash } = require('bcrypt')

async function obtenerUsuariosPorRol(active = false, rolNames, query = {}) {
  const options = {
    where: {
      '$roles.nombre$': { [Op.in]: rolNames },
      ...query
    },
    include: ['roles', 'horarios', 'programaciones']
  }

  if (active) options.where.estado = 1

  return await models.Usuarios.findAll(options)
}

async function buscarUsuario(id) {
  return await models.Usuarios.findByPk(id, {
    include: ['roles']
  })
}

async function buscarUsuarioPorOpciones(options) {
  return await models.Usuarios.findOne({
    where: options,
    include: ['roles']
  })
}

async function crearUsuario(User, options = {}) {
  return await models.Usuarios.create(User, options)
}

async function actualizarUsuario(id, changes, options = {}) {
  const { password } = changes

  const user = await models.Usuarios.findByPk(id)

  const passwordHashed =
    password !== '' && password
      ? await hash(password, 10)
      : user.dataValues.password

  return await user?.update({ ...changes, password: passwordHashed }, options)
}

async function borrarUsuario(id) {
  const user = await models.Usuarios.findByPk(id, {
    include: [
      'horarios',
      'programacion',
      'suscripciones',
      'ventasVendedor',
      'ventasSocios'
    ]
  })
  if (
    user.horarios.length > 0 ||
    user.ventasVendedor.length > 0 ||
    user.ventasSocios.length > 0 ||
    user.suscripciones.length > 0
  )
    return new Error(msg.msgErrorForeignKey)

  await eliminarRolUsuario(id)
  return await user?.destroy()
}

module.exports = {
  buscarUsuario,
  crearUsuario,
  actualizarUsuario,
  obtenerUsuariosPorRol,
  borrarUsuario,
  buscarUsuarioPorOpciones
}
