const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/horarios.service.js')

const msg = {
  notFound: 'horario no encontrado',
  notFoundEmpleado: 'empleado no encontrado',
  addSuccess: 'Horarios actualizados correctamente'
}

const listarHorarios = async (req, res, next) => {
  try {
    const horarios = await services.listarHorarios()
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

const modificarHorario = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req

    const horario = await services.modificarHorarios(id, body)

    if (!horario) return ERROR_RESPONSE.notFound(msg.notFoundEmpleado, res)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarHorarios,
  modificarHorario,
  buscarHorarios
}
