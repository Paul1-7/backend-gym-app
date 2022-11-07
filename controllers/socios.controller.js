const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {
  AgregarInscripcion,
  EliminarInscripcion,
  ModificarInscripcion
} = require('../services/inscripcion.service.js')
const {
  BuscarDisciplinasPorIds
} = require('../services/disciplinas.service.js')
const services = require('../services/usuarios.service.js')
const { SOCIO } = require('../config/roles.js')
const { buscarRolPorNombre } = require('../services/roles.service.js')
const { agregarRolUsuario } = require('../services/rolesUsuarios.services.js')

const msg = {
  notFound: 'Socio no encontrado',
  delete: 'Socio eliminado',
  notValid: 'La disciplina no es valida',
  addSuccess: 'Socio agregado correctamente'
}

const ListarSocios = async (req, res, next) => {
  try {
    const active = false
    const socios = await services.obtenerUsuariosPorRol(active, SOCIO)
    res.json(socios)
  } catch (error) {
    next(error)
  }
}

const BuscarSocios = async (req, res, next) => {
  try {
    const { id } = req.params
    const socios = await services.BuscarSocios(id)

    if (!socios) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(socios)
  } catch (error) {
    next(error)
  }
}

const AgregarSocios = async (req, res, next) => {
  try {
    const { body } = req
    const { inscripcion, ...socios } = body

    const rolSocio = await buscarRolPorNombre(SOCIO)

    const { id: idRol } = rolSocio
    const idDisciplinas = inscripcion.map(
      (disciplinas) => disciplinas.idDisciplina
    )
    const disciplinas = await BuscarDisciplinasPorIds(idDisciplinas)

    if (inscripcion.length !== disciplinas.length || inscripcion.length <= 0)
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const newsocios = await services.crearUsuario(socios)

    const newInscripcion = inscripcion.map((disciplinas) => {
      return {
        ...disciplinas,
        idSocio: newsocios.toJSON().id
      }
    })
    await agregarRolUsuario(newsocios.dataValues.id, [{ idRol }])
    await AgregarInscripcion(newInscripcion)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarSocios = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const { inscripcion, ...socios } = body

    const existSocios = await services.BuscarSocios(id)
    if (!existSocios) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const idDisciplinas = inscripcion.map(
      (disciplinas) => disciplinas.CodDisciplinas
    )
    const disciplinas = await BuscarDisciplinasPorIds(idDisciplinas)

    if (inscripcion.length !== disciplinas.length || inscripcion.length <= 0)
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    await services.ModificarSocios(id, socios)

    const newInscripcion = inscripcion.map((disciplinas) => {
      return {
        ...disciplinas,
        CodSocios: id
      }
    })
    await ModificarInscripcion(id, newInscripcion)
    res.json(socios)
  } catch (error) {
    next(error)
  }
}

const EliminarSocios = async (req, res, next) => {
  try {
    const { id } = req.params
    await EliminarInscripcion(id)
    const socios = await services.EliminarSocios(id)

    if (!socios) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarSocios,
  BuscarSocios,
  AgregarSocios,
  ModificarSocios,
  EliminarSocios
}
