const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function ListarPlanes() {
  return await models.Planes.findAll()
}

async function BuscarPlan(id) {
  return (await models.Planes.findByPk(id))?.toJSON()
}

async function AgregarPlan(plan) {
  return await models.Planes.create(plan)
}

async function ModificarPlan(id, cambio) {
  const plan = await models.Planes.findByPk(id)
  return await plan?.update(cambio)
}

async function EliminarPlan(id) {
 const plan = await models.Planes.findByPk(id,{
   include:['suscripciones']
  })

  if (
    plan.suscripciones.length > 0 
  )
    return new Error(msg.msgErrorForeignKey)

  return await plan?.destroy()
}

module.exports = {
  ListarPlanes,
  BuscarPlan,
  AgregarPlan,
  ModificarPlan,
  EliminarPlan
}
