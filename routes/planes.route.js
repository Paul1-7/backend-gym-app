const express = require('express')
const {
  ListarPlanes,
  BuscarPlan,
  AgregarPlan
} = require('../controllers/planes.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const Planes = express.Router()

Planes.get('/', ListarPlanes)
Planes.get('/:id', checkId, BuscarPlan)
Planes.post('/', AgregarPlan)
// Planes.put('/:id', checkId, ModificarPlan)
// Planes.delete('/:id', checkId, EliminarPlan)

module.exports = Planes
