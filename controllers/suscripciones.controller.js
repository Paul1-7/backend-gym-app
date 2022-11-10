const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { BuscarPlan } = require('../services/planes.service.js')
const services = require('../services/suscripciones.service.js')
const { agregarDiasAFecha } = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Suscripcion no encontrado',
  delete: 'Suscripcion eliminado',
  addSuccess: 'Suscripcion agregado correctamente'
}

const ListarSuscripciones = async (req, res, next) => {
  try {
    const suscripcion = await services.ListarSuscripciones()
    res.json(suscripcion)
  } catch (error) {
    next(error)
  }
}

const BuscarSuscripcion = async (req, res, next) => {
  try {
    const { id } = req.params
    const suscripcion = await services.BuscarSuscripcion(id)

    if (!suscripcion) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(suscripcion)
  } catch (error) {
    next(error)
  }
}

const AgregarSuscripcion = async (req, res, next) => {
  try {
    let { body: suscripcion } = req
    const plan = await BuscarPlan(suscripcion.idPlan)

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)

    suscripcion = {
      ...suscripcion,
      fechaInicio: new Date(),
      fechaFin: agregarDiasAFecha(plan.duracion),
      montoCancelado: plan.precio * suscripcion.cantidad
    }
    await services.AgregarSuscripcion(suscripcion)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarSuscripcion = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const salon = await services.ModificarSuscripcion(id, body)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(salon)
  } catch (error) {
    next(error)
  }
}

const EliminarSuscripcion = async (req, res, next) => {
  try {
    const { id } = req.params
    const salon = await services.EliminarSuscripcion(id)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarSuscripciones,
  BuscarSuscripcion,
  AgregarSuscripcion,
  ModificarSuscripcion,
  EliminarSuscripcion
}
