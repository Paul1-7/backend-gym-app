'use strict'

const { DisciplinasSchema } = require('../models/disciplinas.model')

const { SuscripcionSchema } = require('../models/suscripcion.model')
const { RolesUsuariosSchema } = require('../models/rolesUsuarios.model')
const { RolSchema } = require('../models/roles.model')
const { HorariosSchema } = require('../models/horarios.model')
const { UsuariosSchema } = require('../models/usuarios.model')
const { RoomsSchema } = require('../models/salones.model')
const { ProductosSchema } = require('../models/productos.model')
const { PlanesSchema } = require('../models/planes.model')
const { VentasSchema } = require('../models/ventas.model')
const { DetalleVentasSchema } = require('../models/detalleVentas.model')
const { ProgramacionSchema } = require('../models/programacion.model')
const { EquipmentSchema } = require('../models/maquinarias.model')
const {
  CategoriesEquipmentsSchema
} = require('../models/categoriasMaquinarias.model')
const {
  CategoriasDisciplinasSchema
} = require('../models/categoriasDisciplinas.model')
const {
  CategoriasProductosSchema
} = require('../models/categoriasProductos.model')
const {
  CategoriasMaquinariasRelationSchema
} = require('../models/categoriasMaquinariasRelacion.model')
const {
  DetalleProgramacionSchema
} = require('../models/detalleProgramacion.model')
const { MenusSchema } = require('../models/menus.model')
const { SubmenusSchema } = require('../models/submenus.model')
const { RolesSubmenusSchema } = require('../models/rolesSubmenus.model')

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      'Categorias_Maquinarias',
      CategoriesEquipmentsSchema
    )
    await queryInterface.createTable('Menus', MenusSchema)
    await queryInterface.createTable('Submenus', SubmenusSchema)
    await queryInterface.createTable(
      'Categorias_Productos',
      CategoriasProductosSchema
    )
    await queryInterface.createTable(
      'Categorias_Disciplinas',
      CategoriasDisciplinasSchema
    )
    await queryInterface.createTable('Usuarios', UsuariosSchema)
    await queryInterface.createTable('Planes', PlanesSchema)
    await queryInterface.createTable('Salones', RoomsSchema)
    await queryInterface.createTable('Productos', ProductosSchema)
    await queryInterface.createTable('Disciplinas', DisciplinasSchema)
    await queryInterface.createTable('Suscripciones', SuscripcionSchema)
    await queryInterface.createTable('Roles', RolSchema)
    await queryInterface.createTable('Roles_Usuarios', RolesUsuariosSchema)
    await queryInterface.createTable('Roles_Submenus', RolesSubmenusSchema)
    await queryInterface.createTable('Horarios', HorariosSchema)
    await queryInterface.createTable('Ventas', VentasSchema)
    await queryInterface.createTable('Detalle_Ventas', DetalleVentasSchema)
    await queryInterface.createTable('Programacion', ProgramacionSchema)
    await queryInterface.createTable('Maquinarias', EquipmentSchema)
    await queryInterface.createTable(
      'Detalle_Programacion',
      DetalleProgramacionSchema
    )
    await queryInterface.createTable(
      'Categorias_Maquinarias_Relacion',
      CategoriasMaquinariasRelationSchema
    )
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Detalle_Programacion')
    await queryInterface.dropTable('Programacion')
    await queryInterface.dropTable('Roles_Usuarios')
    await queryInterface.dropTable('Roles_Submenus')
    await queryInterface.dropTable('Detalle_Ventas')
    await queryInterface.dropTable('Ventas')
    await queryInterface.dropTable('Horarios')
    await queryInterface.dropTable('Roles')
    await queryInterface.dropTable('Suscripciones')
    await queryInterface.dropTable('Usuarios')
    await queryInterface.dropTable('Disciplinas')
    await queryInterface.dropTable('Salones')
    await queryInterface.dropTable('Productos')
    await queryInterface.dropTable('Planes')
    await queryInterface.dropTable('Categorias_Maquinarias_Relacion')
    await queryInterface.dropTable('Maquinarias')
    await queryInterface.dropTable('Categorias_Maquinarias')
    await queryInterface.dropTable('Categorias_Productos')
    await queryInterface.dropTable('Categorias_Disciplinas')
    await queryInterface.dropTable('Submenus')
    await queryInterface.dropTable('Menus')
  }
}
