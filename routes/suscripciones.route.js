const express = require('express')
const {
  ListarSuscripciones,
  BuscarSuscripcion,
  AgregarSuscripcion,
  ListaReporteSuscripciones,
  ListarReportesPorRenovacion,
  ReporteDeResultados
} = require('../controllers/suscripciones.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const Suscripciones = express.Router()

Suscripciones.get('/', ListarSuscripciones)
Suscripciones.get('/reporte-default', ListaReporteSuscripciones)
Suscripciones.get('/reporte-renovacion', ListarReportesPorRenovacion)
Suscripciones.get('/reporte-resultados', ReporteDeResultados)
Suscripciones.get('/:id', checkId, BuscarSuscripcion)
Suscripciones.post('/', AgregarSuscripcion)
// Suscripciones.put('/:id', checkId, ModificarSuscripcion)
// Suscripciones.delete('/:id', checkId, EliminarSuscripcion)

module.exports = Suscripciones
