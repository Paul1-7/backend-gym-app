const express = require('express')
const {
  ListarSalon,
  BuscarSalon,
  AgregarSalon,
  ModificarSalon,
  EliminarSalon
} = require('../controllers/salones.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const Salones = express.Router()

Salones.get('/', ListarSalon)
Salones.get('/:id', checkId, BuscarSalon)
Salones.post('/', AgregarSalon)
Salones.put('/:id', checkId, ModificarSalon)
Salones.delete('/:id', checkId, EliminarSalon)

module.exports = Salones
