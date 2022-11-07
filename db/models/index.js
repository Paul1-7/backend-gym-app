const { Disciplinas, DisciplinasSchema } = require('./disciplinas.model.js')

const { Rol, RolSchema } = require('./roles.model.js')
const {
  RolesUsuarios,
  RolesUsuariosSchema
} = require('./rolesUsuarios.model.js')
const { Horarios, HorariosSchema } = require('./horarios.model.js')
const { Usuarios, UsuariosSchema } = require('./usuarios.model.js')
const { Rooms, RoomsSchema } = require('./salones.model.js')
const { Suscripcion, SuscripcionSchema } = require('./suscripcion.model.js')
const { Productos, ProductosSchema } = require('./productos.model.js')

function setUpModels(sequelize) {
  Usuarios.init(UsuariosSchema, Usuarios.config(sequelize))
  Rooms.init(RoomsSchema, Rooms.config(sequelize))
  Productos.init(ProductosSchema, Productos.config(sequelize))
  Disciplinas.init(DisciplinasSchema, Disciplinas.config(sequelize))
  Suscripcion.init(SuscripcionSchema, Suscripcion.config(sequelize))
  Rol.init(RolSchema, Rol.config(sequelize))
  RolesUsuarios.init(RolesUsuariosSchema, RolesUsuarios.config(sequelize))
  Horarios.init(HorariosSchema, Horarios.config(sequelize))

  Usuarios.associate(sequelize.models)
  Productos.associate(sequelize.models)
  Rol.associate(sequelize.models)
  RolesUsuarios.associate(sequelize.models)
  Disciplinas.associate(sequelize.models)
  Rooms.associate(sequelize.models)
}

module.exports = setUpModels
