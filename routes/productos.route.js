const express = require('express')
const {
  ListarProductos,
  BuscarProducto,
  AgregarProducto
} = require('../controllers/productos.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const Productos = express.Router()

Productos.get('/', ListarProductos)
Productos.get('/:id', checkId, BuscarProducto)
Productos.post('/', AgregarProducto)
// Salones.put('/:id', checkId, ModificarSalon)
// Salones.delete('/:id', checkId, EliminarSalon)

module.exports = Productos
