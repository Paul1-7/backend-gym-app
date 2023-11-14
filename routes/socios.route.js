const express = require('express')
const {
  ListarSocios,
  BuscarSocios,
  AgregarSocios,
  ModificarSocios,
  EliminarSocios,
  obtenerSociosMayorSuscripcion,
  obtenerSociosMasCompradores,
  obtenerSociosMasProgramaciones
} = require('../controllers/socios.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const Socios = express.Router()

Socios.get('/', ListarSocios)
Socios.get('/mayor-suscripciones', obtenerSociosMayorSuscripcion)
Socios.get('/mas-compradores', obtenerSociosMasCompradores)
Socios.get('/mas-programaciones', obtenerSociosMasProgramaciones)
Socios.get('/:id', checkId, BuscarSocios)
Socios.post('/', AgregarSocios)
Socios.put('/:id', checkId, ModificarSocios)
Socios.delete('/:id', checkId, EliminarSocios)

module.exports = Socios
