const express = require('express')
const {
  listarEmpleados,
  buscarEmpleado,
  crearEmpleado
} = require('../controllers/empleados.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const Empleados = express.Router()

Empleados.get('/', listarEmpleados)
Empleados.get('/:id', checkId, buscarEmpleado)
Empleados.post('/', crearEmpleado)
// Socios.put('/:id', checkId, ModificarSocios)
// Socios.delete('/:id', checkId, EliminarSocios)

module.exports = Empleados
