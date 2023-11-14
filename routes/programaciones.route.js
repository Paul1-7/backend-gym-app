const express = require('express')
const {
  listarProgramaciones,
  agregarProgramacion,
  modificarProgramacion,
  buscarProgramacionPorId,
  obtenerInterseccionSociosProgramacion,
  obtenerDisciplinasMasProgramadas
} = require('../controllers/programacion.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const Programacion = express.Router()

Programacion.get('/', listarProgramaciones)
Programacion.get(
  '/disciplinas-mas-programadas',
  obtenerDisciplinasMasProgramadas
)
Programacion.get(
  '/disponibilidad-socios/',
  obtenerInterseccionSociosProgramacion
)
Programacion.get('/:id', checkId, buscarProgramacionPorId)
Programacion.post('/', agregarProgramacion)
Programacion.put('/:id', checkId, modificarProgramacion)

module.exports = Programacion
