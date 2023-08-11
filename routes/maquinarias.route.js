const express = require('express')
const { checkId } = require('../middlewares/validator.handle.js')
const {
  listarMaquinarias,
  buscarMaquinaria,
  agregarMaquinaria,
  modificarMaquinaria,
  eliminarMaquinaria
} = require('../controllers/maquinarias.controller.js')

const maquinarias = express.Router()

maquinarias.get('/', listarMaquinarias)
maquinarias.get('/:id', checkId, buscarMaquinaria)
maquinarias.post('/', agregarMaquinaria)
maquinarias.put('/:id', checkId, modificarMaquinaria)
maquinarias.delete('/:id', checkId, eliminarMaquinaria)

module.exports = maquinarias
