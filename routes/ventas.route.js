const express = require('express')
const {
  ListarVentas,
  BuscarVenta,
  AgregarVenta,
  ListarVentasParaReporte
} = require('../controllers/ventas.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const Ventas = express.Router()

Ventas.get('/', ListarVentas)
Ventas.get('/reporte', ListarVentasParaReporte)
Ventas.get('/:id', checkId, BuscarVenta)
Ventas.post('/', AgregarVenta)
// Ventas.put('/:id', checkId, ModificarVenta)
// Ventas.delete('/:id', checkId, EliminarVenta)

module.exports = Ventas
