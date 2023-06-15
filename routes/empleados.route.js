const express = require('express')
const {
  listarEmpleados,
  buscarEmpleado,
  crearEmpleado,
  modificarEmpleado,
  eliminarEmpleado
} = require('../controllers/empleados.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const Empleados = express.Router()

Empleados.get('/', listarEmpleados)
Empleados.get('/:id', checkId, buscarEmpleado)
Empleados.post('/', crearEmpleado)
Empleados.put('/:id', checkId, modificarEmpleado)
Empleados.delete('/:id', checkId, eliminarEmpleado)

module.exports = Empleados
