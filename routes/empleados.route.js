const express = require('express')
const {
  listarEmpleados,
  buscarEmpleado,
  crearEmpleado,
  modificarEmpleado,
  eliminarEmpleado,
  listarEntrenadores,
  obtenerEntrenadoresMasProgramaciones
} = require('../controllers/empleados.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const Empleados = express.Router()

Empleados.get('/', listarEmpleados)
Empleados.get(
  '/entrenadores-mas-programaciones',
  obtenerEntrenadoresMasProgramaciones
)
Empleados.get('/entrenadores', listarEntrenadores)
Empleados.get('/:id', checkId, buscarEmpleado)
Empleados.post('/', crearEmpleado)
Empleados.put('/:id', checkId, modificarEmpleado)
Empleados.delete('/:id', checkId, eliminarEmpleado)

module.exports = Empleados
