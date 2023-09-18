const express = require('express')
const {
  listarCategorias,
  buscarCategorias,
  agregarCategorias,
  modificarCategoria,
  eliminarCategoria
} = require('../controllers/categorias.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const Categoria = express.Router()

Categoria.get('/', listarCategorias)
Categoria.get('/:id', checkId, buscarCategorias)
Categoria.post('/', agregarCategorias)
Categoria.put('/:id', checkId, modificarCategoria)
Categoria.delete('/:id', checkId, eliminarCategoria)

module.exports = Categoria
