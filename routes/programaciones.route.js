const express = require('express')
const {
  listarProgramaciones,
  agregarProgramacion,
  modificarProgramacion,
  buscarProgramacionPorId
} = require('../controllers/programacion.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const Programacion = express.Router()

Programacion.get('/', listarProgramaciones)
Programacion.get('/:id', checkId, buscarProgramacionPorId)
Programacion.post('/', agregarProgramacion)
Programacion.put('/:id', checkId, modificarProgramacion)

module.exports = Programacion
