const {
  SOCIO,
  RECEPCIONISTA,
  ENTRENADOR,
  ADMINiSTRADOR,
  LIMPIEZA
} = require('../config/roles.js')
const sequelize = require('../libs/sequelize.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {
  BuscarDisciplinasPorIds
} = require('../services/disciplinas.service.js')

const { obtenerRoles } = require('../services/roles.service.js')
const { agregarRolUsuario } = require('../services/rolesUsuarios.services.js')

const userServices = require('../services/usuarios.service.js')
const {
  sonDatosValidos,
  agregarRolSocio,
  agregarRolRecepcionista
} = require('../utils/dataHandler.js')

const msg = {
  employeeNotFound: 'Empleado no encontrado',
  rolNotFound: 'Rol no encontrado',
  delete: 'Empleado eliminado',
  addSuccess: 'Empleado registrado correctamente',
  notValidDisciplina: 'La disciplina no es valida'
}

const listarEmpleados = async (req, res, next) => {
  try {
    const active = false
    const empleados = await userServices.obtenerUsuariosPorRol(
      active,
      RECEPCIONISTA,
      ENTRENADOR,
      ADMINiSTRADOR,
      LIMPIEZA,
      SOCIO
    )
    res.json(empleados)
  } catch (error) {
    next(error)
  }
}

const buscarEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params
    const empleados = await userServices.findUser(id)

    if (!empleados) return ERROR_RESPONSE.notFound(msg.employeeNotFound, res)
    res.json(empleados)
  } catch (error) {
    next(error)
  }
}

const crearEmpleado = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { body } = req
    const  { roles, ...dataUser } = body

    const allRoles = await obtenerRoles()

    let newRoles = agregarRolSocio(allRoles, roles)
    newRoles = agregarRolRecepcionista(allRoles, roles)
    console.log("TCL: crearEmpleado -> newRoles", newRoles)

    const empleado = await userServices.crearUsuario(dataUser,{transaction})

    const rolObject = newRoles.map(idRol => ({idRol}))

    await agregarRolUsuario(empleado.dataValues.id, rolObject,{transaction})
    transaction.commit()
    res.json({ message: msg.addSuccess })
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const { roles, ...dataUser } = body

    const user = await userServices.updateUser(id, dataUser)

    if (!user) return ERROR_RESPONSE.notFound(msg.employeeNotFound, res)

    res.json(user)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await empServices.deleteEmplooye(id)

    if (!user) return ERROR_RESPONSE.notFound(msg.employeeNotFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarEmpleados,
  buscarEmpleado,
  crearEmpleado,
  updateUser,
  deleteUser
}
