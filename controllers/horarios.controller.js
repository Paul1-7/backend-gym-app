const { getWeek, getDay, format, parseISO } = require('date-fns')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/horarios.service.js')

const msg = {
  notFound: 'horario no encontrado',
  notFoundEmpleado: 'empleado no encontrado',
  addSuccess: 'horario agregado correctamente',
  modifySuccess: 'horario modificado correctamente',
  deleteSuccess: 'horario eliminado correctamente',
  notValid:
    'el entrenador o salón coincide con otro horario establecido con anterioridad '
}

const getMatchSchedule = (availableSchedule, incomingData) => {
  const { idSalon, idEntrenador } = incomingData
  return availableSchedule.some((availability) => {
    const values = Object.values(availability)
    return values.includes(idSalon) || values.includes(idEntrenador)
  })
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

const listarHorariosEntrenadores = async (req, res, next) => {
  try {
    const entrenadores = await services.obtenerHorariosEntrenadores()
    res.json(entrenadores)
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
    const { horarioEntrada, horarioSalida } = body
    const day = getDay(new Date(horarioEntrada))

    const availability = await services.verificarDisponibilidad(
      horarioEntrada,
      horarioSalida
    )

    const matchSchedule = getMatchSchedule(availability, body)

    if (matchSchedule) {
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)
    }

    await services.agregarHorario({
      ...body,
      dia: day,
      horaEntrada: format(parseISO(horarioEntrada), 'HH:mm:ss'),
      horaSalida: format(parseISO(horarioSalida), 'HH:mm:ss')
    })
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
  eliminarHorario,
  listarHorariosEntrenadores
}
