const { hash } = require('bcrypt')
const { ENTRENADOR } = require('../config/roles.js')
const sequelize = require('../libs/sequelize.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')

const { obtenerRoles } = require('../services/roles.service.js')
const {
  agregarRolUsuario,
  actualizarRolUsuario
} = require('../services/rolesUsuarios.services.js')

const userServices = require('../services/usuarios.service.js')
const { agregarRolSocio } = require('../utils/dataHandler.js')

const msg = {
  employeeNotFound: 'Empleado no encontrado',
  rolNotFound: 'Rol no encontrado',
  delete: 'Empleado eliminado',
  addSuccess: 'Empleado registrado correctamente',
  modifySuccess: 'Empleado modificado correctamente',
  notValidDisciplina: 'La disciplina no es valida'
}

const listarEmpleados = async (req, res, next) => {
  try {
    const active = false
    const empleados = await userServices.obtenerEmpleados(active)
    res.json(empleados)
  } catch (error) {
    next(error)
  }
}
const listarEntrenadores = async (req, res, next) => {
  try {
    const { query } = req
    const active = false
    const hasQuery = !!Object.keys(query).length
    const empleados = await userServices.obtenerUsuariosPorRol(
      active,
      [ENTRENADOR],
      hasQuery ? query : null
    )
    res.json(empleados)
  } catch (error) {
    next(error)
  }
}

const obtenerEntrenadoresMasProgramaciones = async (req, res, next) => {
  try {
    const { query } = req
    const empleados = await userServices.obtenerEntrenadoresMasProgramaciones(
      query
    )
    res.json(empleados)
  } catch (error) {
    next(error)
  }
}

const buscarEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params
    const empleados = await userServices.buscarUsuario(id)

    if (!empleados) return ERROR_RESPONSE.notFound(msg.employeeNotFound, res)

    res.json({ ...empleados.dataValues, password: '' })
  } catch (error) {
    next(error)
  }
}

const crearEmpleado = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { body } = req
    const { roles, ...dataUser } = body

    const allRoles = await obtenerRoles()

    let newRoles = agregarRolSocio(allRoles, roles)
    const passwordHashed = await hash(dataUser.password.toString(), 10)
    const empleado = await userServices.crearUsuario(
      { ...dataUser, password: passwordHashed },
      { transaction }
    )

    const rolObject = newRoles.map((idRol) => ({ idRol }))

    await agregarRolUsuario(empleado.dataValues.id, rolObject, { transaction })
    transaction.commit()
    res.json({ message: msg.addSuccess })
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

const modificarEmpleado = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.params
    const { body } = req
    const { roles, ...dataUser } = body

    const empleado = await userServices.actualizarUsuario(id, dataUser, {
      transaction
    })

    if (!empleado) return ERROR_RESPONSE.notFound(msg.employeeNotFound, res)

    const allRoles = await obtenerRoles()

    let newRoles = agregarRolSocio(allRoles, roles)
    const rolObject = newRoles.map((idRol) => ({ idRol }))
    await actualizarRolUsuario(id, rolObject, {
      transaction
    })
    transaction.commit()
    res.json({ message: msg.modifySuccess })
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

const eliminarEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params

    const existeEmpleado = await userServices.buscarUsuario(id)
    if (!existeEmpleado) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const socioBorrado = await userServices.borrarUsuario(id)

    if (socioBorrado instanceof Error)
      return ERROR_RESPONSE.notAcceptable(socioBorrado.message, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarEmpleados,
  buscarEmpleado,
  crearEmpleado,
  modificarEmpleado,
  eliminarEmpleado,
  listarEntrenadores,
  obtenerEntrenadoresMasProgramaciones
}
