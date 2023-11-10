const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { BuscarPlan } = require('../services/planes.service.js')
const services = require('../services/suscripciones.service.js')
const {
  agregarDiasAFecha,
  obtenerDiasRestantes
} = require('../utils/dataHandler.js')

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

const ListarReportesPorRenovacion = async (req, res, next) => {
  try {
    const { query } = req
    const suscripcion = await services.SociosPorRenovacionSuscripciones(query)
    res.json(suscripcion)
  } catch (error) {
    next(error)
  }
}

const ListaReporteSuscripciones = async (req, res, next) => {
  try {
    const { query } = req

    const suscripciones = !Object.keys(query).length
      ? await services.ListarSuscripciones()
      : await services.SuscripcionesEntreFechas(query)
    res.json(suscripciones)
  } catch (error) {
    next(error)
  }
}

const obtenerPlanMasSolicitado = async (req, res, next) => {
  try {
    const { query } = req
    const data = await services.ObtenerPlanMasSolicitado(query)
    res.json(data)
  } catch (error) {
    next(error)
  }
}
const obtenerSuscripcionesActivas = async (req, res, next) => {
  try {
    const data = await services.ObtenerSuscripcionesActivas()
    res.json(data)
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
const BuscarUltimasSuscripciones = async (req, res, next) => {
  try {
    const { idSocio } = req.params
    const activeSuscriptions = await services.ObtenerUltimasSucripciones(
      idSocio
    )

    if (!activeSuscriptions.length)
      return res.json({ id: null, activeSuscriptions: [], daysRemaining: null })

    res.json({
      id: activeSuscriptions[0].id,
      activeSuscriptions,
      daysRemaining: obtenerDiasRestantes(activeSuscriptions[0].fechaFin)
    })
  } catch (error) {
    next(error)
  }
}

const AgregarSuscripcion = async (req, res, next) => {
  try {
    let { body: suscripcion } = req
    const plan = await BuscarPlan(suscripcion.idPlan)

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const activeSuscriptions = await services.ObtenerUltimasSucripciones(
      suscripcion.idSocio
    )
    const daysRemaining = obtenerDiasRestantes(
      activeSuscriptions?.[0]?.fechaFin ?? new Date()
    )

    suscripcion = {
      ...suscripcion,
      montoCancelado: plan.precio * suscripcion.cantidad,
      diasExtras: daysRemaining
    }
    await services.AgregarSuscripcion(suscripcion)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const modificarSuscripcion = async (req, res, next) => {
  try {
    const { id } = req.params

    let { body } = req
    suscripcion = {
      fechaInicio: body.fechaInicio,
      fechaFin: body.fechaFin
    }
    await services.ModificarSuscripcion(id, suscripcion)
    res.json({ message: msg.addSuccess })
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
  modificarSuscripcion,
  EliminarSuscripcion,
  ListaReporteSuscripciones,
  ListarReportesPorRenovacion,
  obtenerPlanMasSolicitado,
  BuscarUltimasSuscripciones,
  obtenerSuscripcionesActivas
}
