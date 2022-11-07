const express = require('express')
const {
  listarHorarios,
  modificarHorario,
  buscarHorarios
} = require('../controllers/horarios.controller')

const Horarios = express.Router()

Horarios.get('/', listarHorarios)
Horarios.get('/:id', buscarHorarios)
Horarios.put('/:id', modificarHorario)

module.exports = Horarios
