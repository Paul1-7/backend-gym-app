const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function ListarSalones() {
  return await models.Salones.findAll()
}

async function ContarCodigoSalon(number) {
  const pattern = `S${number}%`
  return await models.Salones.count({
    where: {
      codSalon: {
        [Op.like]: pattern
      }
    }
  })
}

async function BuscarSalon(id) {
  return await models.Salones.findByPk(id)
}

async function BuscarSalonesPorIds(ids) {
  return await models.Salones.findAll({
    where: {
      id: { [Op.in]: ids }
    }
  })
}

async function AgregarSalon(salon) {
  return await models.Salones.create(salon)
}

async function ModificarSalon(id, cambio) {
  const salon = await models.Salones.findByPk(id)
  return await salon?.update(cambio)
}

async function EliminarSalon(id) {
  const salon = await models.Salones.findByPk(id, {
    include: ['horarios']
  })

  if (salon.horarios.length > 0) return new Error(msg.msgErrorForeignKey)

  return await salon?.destroy()
}

module.exports = {
  ListarSalones,
  BuscarSalon,
  AgregarSalon,
  ModificarSalon,
  EliminarSalon,
  BuscarSalonesPorIds,
  ContarCodigoSalon
}
