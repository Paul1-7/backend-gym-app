'use strict'

const { DisciplinasSchema } = require('../models/disciplinas.model')

const { SuscripcionSchema } = require('../models/suscripcion.model')
const { RolesUsuariosSchema } = require('../models/rolesUsuarios.model')
const { RolSchema } = require('../models/roles.model')
const { HorariosSchema } = require('../models/horarios.model')
const { UsuariosSchema } = require('../models/usuarios.model')
const { RoomsSchema } = require('../models/salones.model')
const { ProductosSchema } = require('../models/productos.model')

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Usuarios', UsuariosSchema)
    await queryInterface.createTable('Salones', RoomsSchema)
    await queryInterface.createTable('Productos', ProductosSchema)
    await queryInterface.createTable('Disciplinas', DisciplinasSchema)
    await queryInterface.createTable('Suscripcion', SuscripcionSchema)
    await queryInterface.createTable('Roles', RolSchema)
    await queryInterface.createTable('Roles_Usuarios', RolesUsuariosSchema)
    await queryInterface.createTable('Horarios', HorariosSchema)
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Roles_Usuarios')
    await queryInterface.dropTable('Horarios')
    await queryInterface.dropTable('Roles')
    await queryInterface.dropTable('Suscripcion')
    await queryInterface.dropTable('Usuarios')
    await queryInterface.dropTable('Disciplinas')
    await queryInterface.dropTable('Salones')
    await queryInterface.dropTable('Productos')
  }
}
