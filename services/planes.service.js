const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function ListarPlanes(query = {}) {
  let options = {}
  if (Object.values(query).length > 0) {
    options = {
      where: {
        [Op.or]: [
          {
            fechaVencimiento: {
              [Op.gte]: query?.fechaVencimiento
            }
          },
          {
            fechaVencimiento: {
              [Op.is]: null
            }
          }
        ]
      }
    }
  }

  return await models.Planes.findAll(options)
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
  const plan = await models.Planes.findByPk(id, {
    include: ['suscripciones']
  })

  if (plan.suscripciones.length > 0) return new Error(msg.msgErrorForeignKey)

  return await plan?.destroy()
}

module.exports = {
  ListarPlanes,
  BuscarPlan,
  AgregarPlan,
  ModificarPlan,
  EliminarPlan
}
