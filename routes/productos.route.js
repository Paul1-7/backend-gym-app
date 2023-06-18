const express = require('express')
const {
  ListarProductos,
  BuscarProducto,
  AgregarProducto,
  EliminarProducto,
  ModificarProducto
} = require('../controllers/productos.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const Productos = express.Router()

Productos.get('/', ListarProductos)
Productos.get('/:id', checkId, BuscarProducto)
Productos.post('/', AgregarProducto)
Productos.put('/:id', checkId, ModificarProducto)
Productos.delete('/:id', checkId, EliminarProducto)

module.exports = Productos
