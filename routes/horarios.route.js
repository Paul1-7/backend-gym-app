const express = require('express')
const {
  listarHorarios,
  modificarHorario,
  buscarHorarios,
  agregarHorario,
  eliminarHorario
} = require('../controllers/horarios.controller')

const Horarios = express.Router()

Horarios.get('/', listarHorarios)
Horarios.get('/:id', buscarHorarios)
Horarios.post('/', agregarHorario)
Horarios.put('/:id', modificarHorario)
Horarios.delete('/:id', eliminarHorario)

module.exports = Horarios
