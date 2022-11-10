const { models } = require('../libs/sequelize.js')

async function ListarSuscripciones() {
  return await models.Suscripciones.findAll({ include: ['socio', 'plan'] })
}

async function BuscarSuscripcion(id) {
  return await models.Suscripciones.findByPk(id)
}

async function AgregarSuscripcion(suscripcion) {
  return await models.Suscripciones.create(suscripcion)
}

async function ModificarSuscripcion(id, cambio) {
  const salon = await models.Suscripciones.findByPk(id)
  return await salon?.update(cambio)
}

async function EliminarSuscripcion(id) {
  const salon = await models.Suscripciones.findByPk(id)
  return await salon?.destroy()
}

module.exports = {
  ListarSuscripciones,
  BuscarSuscripcion,
  AgregarSuscripcion,
  ModificarSuscripcion,
  EliminarSuscripcion
}
