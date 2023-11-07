const express = require('express')

const { checkId } = require('../middlewares/validator.handle.js')
const {
  listarRoles,
  buscarRol,
  agregarRol,
  modificarRol,
  eliminarRol
} = require('../controllers/roles.controller.js')

const Socios = express.Router()

Socios.get('/', listarRoles)
Socios.get('/:id', checkId, buscarRol)
Socios.post('/', agregarRol)
Socios.put('/:id', checkId, modificarRol)
Socios.delete('/:id', checkId, eliminarRol)

module.exports = Socios
