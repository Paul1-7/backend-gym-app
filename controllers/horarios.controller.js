const { getWeek, getDay } = require('date-fns')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/horarios.service.js')

const msg = {
  notFound: 'horario no encontrado',
  notFoundEmpleado: 'empleado no encontrado',
  addSuccess: 'horario agregado correctamente',
  modifySuccess: 'horario modificado correctamente',
  deleteSuccess: 'horario eliminado correctamente'
}

const listarHorarios = async (req, res, next) => {
  try {
    const { query } = req
    const hasQuery = !!Object.keys(query).length
    const horarios = await services.ListarHorarios(hasQuery ? query : null)
    res.json(horarios)
  } catch (error) {
    next(error)
  }
}

const buscarHorarios = async (req, res, next) => {
  try {
    const { id } = req.params
    const horarios = await services.buscarHorario(id)

    if (!horarios) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(horarios)
  } catch (error) {
    next(error)
  }
}

const agregarHorario = async (req, res, next) => {
  try {
    const { body } = req
    const day = getDay(new Date(body.horarioEntrada))

    await services.agregarHorario({ ...body, dia: day })
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const modificarHorario = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req

    const day = getWeek(new Date(body.horarioEntrada))

    const horario = await services.modificarHorarios(id, { ...body, dia: day })

    if (!horario) return ERROR_RESPONSE.notFound(msg.notFoundEmpleado, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const eliminarHorario = async (req, res, next) => {
  try {
    const { id } = req.params
    await services.eliminarHorarios(id)

    res.json({ message: msg.deleteSuccess, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarHorarios,
  modificarHorario,
  buscarHorarios,
  agregarHorario,
  eliminarHorario
}
