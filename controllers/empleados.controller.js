const {
  SOCIO,
  RECEPCIONISTA,
  ENTRENADOR,
  ADMINiSTRADOR,
  LIMPIEZA
} = require('../config/roles.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {
  BuscarDisciplinasPorIds
} = require('../services/disciplinas.service.js')
const { agregarHorario } = require('../services/horarios.service.js')
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
  try {
    const { body } = req
    let { roles, horarios, ...dataUser } = body

    const allRoles = await obtenerRoles()
    const idDisciplinas = horarios?.map(
      (disciplinas) => disciplinas.idDisciplina
    )
    const disciplinas = await BuscarDisciplinasPorIds(idDisciplinas)

    if (horarios?.length !== disciplinas?.length || horarios?.length <= 0)
      return ERROR_RESPONSE.notAcceptable(msg.notValidDisciplina, res)

    if (
      !sonDatosValidos(allRoles, roles, 'id', 'idRol') ||
      roles?.length === 0 ||
      typeof roles === 'undefined'
    )
      return ERROR_RESPONSE.notFound(msg.rolNotFound, res)

    roles = agregarRolSocio(allRoles, roles)
    console.log('TCL: crearEmpleado -> rolesSocio', roles)

    roles = agregarRolRecepcionista(allRoles, roles)
    console.log('TCL: crearEmpleado -> rolesRecep', roles)

    const empleado = await userServices.crearUsuario(dataUser)

    const newHorario = horarios.map((horario) => {
      return {
        ...horario,
        idUsuario: empleado.toJSON().id
      }
    })
    await agregarRolUsuario(empleado.dataValues.id, roles)
    await agregarHorario(newHorario)

    res.json({ message: msg.addSuccess })
  } catch (error) {
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
