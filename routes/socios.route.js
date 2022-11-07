const express = require('express')
const { ListarSocios, BuscarSocios, AgregarSocios, ModificarSocios, EliminarSocios } = require('../controllers/socios.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')



const Socios = express.Router()

Socios.get('/', ListarSocios)
Socios.get('/:id', checkId, BuscarSocios)
Socios.post('/', AgregarSocios)
Socios.put('/:id', checkId, ModificarSocios)
Socios.delete('/:id', checkId, EliminarSocios)

module.exports = Socios
