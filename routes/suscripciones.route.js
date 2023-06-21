const express = require('express')
const {
  ListarSuscripciones,
  BuscarSuscripcion,
  AgregarSuscripcion,
  ListaReporteSuscripciones,
  ListarReportesPorRenovacion,
  ReporteDeResultados,
  BuscarUltimaSuscripcion
} = require('../controllers/suscripciones.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const Suscripciones = express.Router()

Suscripciones.get('/', ListarSuscripciones)
Suscripciones.get('/reporte-default', ListaReporteSuscripciones)
Suscripciones.get('/reporte-renovacion', ListarReportesPorRenovacion)
Suscripciones.get('/reporte-resultados', ReporteDeResultados)
Suscripciones.get('/ultima-suscripcion/:idSocio', BuscarUltimaSuscripcion)
Suscripciones.get('/:id', checkId, BuscarSuscripcion)

Suscripciones.post('/', AgregarSuscripcion)

module.exports = Suscripciones
