const express = require('express')

const { checkId } = require('../middlewares/validator.handle.js')
const {
  listarCategoriasProductos,
  buscarCategoriaProducto,
  agregarCategoriaProducto,
  modificarCategoriaProducto,
  eliminarCategoriaProducto
} = require('../controllers/categoriasProductos.controller.js')
const {
  listarCategoriasDisciplinas,
  buscarCategoriaDisciplina,
  agregarCategoriaDisciplina,
  modificarCategoriaDisciplina,
  eliminarCategoriaDisciplina
} = require('../controllers/categoriasDisciplinas.controller.js')
const {
  listarCategoriasMaquinarias,
  buscarCategoriaMaquinaria,
  agregarCategoriaMaquinaria,
  modificarCategoriaMaquinaria,
  eliminarCategoriaMaquinaria
} = require('../controllers/categoriasMaquinarias.controller.js')

const Categoria = express.Router()

Categoria.get('/productos/', listarCategoriasProductos)
Categoria.get('/productos/:id', checkId, buscarCategoriaProducto)
Categoria.post('/productos/', agregarCategoriaProducto)
Categoria.put('/productos/:id', checkId, modificarCategoriaProducto)
Categoria.delete('/productos/:id', checkId, eliminarCategoriaProducto)

Categoria.get('/disciplinas/', listarCategoriasDisciplinas)
Categoria.get('/disciplinas/:id', checkId, buscarCategoriaDisciplina)
Categoria.post('/disciplinas/', agregarCategoriaDisciplina)
Categoria.put('/disciplinas/:id', checkId, modificarCategoriaDisciplina)
Categoria.delete('/disciplinas/:id', checkId, eliminarCategoriaDisciplina)

Categoria.get('/maquinarias/', listarCategoriasMaquinarias)
Categoria.get('/maquinarias/:id', checkId, buscarCategoriaMaquinaria)
Categoria.post('/maquinarias/', agregarCategoriaMaquinaria)
Categoria.put('/maquinarias/:id', checkId, modificarCategoriaMaquinaria)
Categoria.delete('/maquinarias/:id', checkId, eliminarCategoriaMaquinaria)

module.exports = Categoria
