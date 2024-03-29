const express = require('express')
const {
  ListarSuscripciones,
  BuscarSuscripcion,
  AgregarSuscripcion,
  ListaReporteSuscripciones,
  ListarReportesPorRenovacion,
  ReporteDeResultados,
  BuscarUltimasSuscripciones,
  modificarSuscripcion,
  obtenerPlanMasSolicitado,
  obtenerSuscripcionesActivas
} = require('../controllers/suscripciones.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const Suscripciones = express.Router()

Suscripciones.get('/', ListarSuscripciones)
Suscripciones.get('/reporte-default', ListaReporteSuscripciones)
Suscripciones.get('/reporte-renovacion', ListarReportesPorRenovacion)
Suscripciones.get('/planes-mas-solicitados', obtenerPlanMasSolicitado)
Suscripciones.get('/activas', obtenerSuscripcionesActivas)
Suscripciones.get('/ultima-suscripcion/:idSocio', BuscarUltimasSuscripciones)
Suscripciones.get('/:id', checkId, BuscarSuscripcion)

Suscripciones.post('/', AgregarSuscripcion)
Suscripciones.put('/:id', modificarSuscripcion)

module.exports = Suscripciones
