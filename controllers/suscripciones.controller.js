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

const ReporteDeResultados = async (req, res, next) => {
  try {
    const planMasSolicitado = await services.ObtenerPlanMasSolicitado()
    const socioMayorSuscripcion = await services.ObtenerSocioMayorSuscripcion()
    const numSucripcionesActivas =
      await services.ObtenerNumSuscripcionesActivas()
    const promRenovaciones = await services.ObtenerPromRenovacionSusc()
    res.json({
      planMasSolicitado,
      socioMayorSuscripcion,
      numSucripcionesActivas,
      promRenovaciones
    })
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
const BuscarUltimaSuscripcion = async (req, res, next) => {
  try {
    const { idSocio } = req.params
    const lastSubscription = await services.ObtenerUltimaSucripcion(idSocio)

    if (!lastSubscription) return res.json({ id: null, daysRemaining: null })

    res.json({
      id: lastSubscription.id,
      daysRemaining: lastSubscription.diasExtras
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

    suscripcion = {
      ...suscripcion,
      fechaInicio: new Date(),
      fechaFin: agregarDiasAFecha(plan.duracion * suscripcion.cantidad),
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
  EliminarSuscripcion,
  ListaReporteSuscripciones,
  ListarReportesPorRenovacion,
  ReporteDeResultados,
  BuscarUltimaSuscripcion
}
