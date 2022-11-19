const { models } = require('../libs/sequelize.js')

async function ListarPlanes() {
  return await models.Planes.findAll()
}

async function BuscarPlan(id) {
  return (await models.Planes.findByPk(id))?.toJSON()
}

async function AgregarPlan(salon) {
  return await models.Planes.create(salon)
}

async function ModificarPlan(id, cambio) {
  const salon = await models.Planes.findByPk(id)
  return await salon?.update(cambio)
}

async function EliminarPlan(id) {
  const salon = await models.Planes.findByPk(id)
  return await salon?.destroy()
}

module.exports = {
  ListarPlanes,
  BuscarPlan,
  AgregarPlan,
  ModificarPlan,
  EliminarPlan
}
