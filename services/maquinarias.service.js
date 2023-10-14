const { format } = require('date-fns')
const { models } = require('../libs/sequelize.js')
const { Op } = require('sequelize')

async function listarMaquinarias() {
  return await models.Maquinarias.findAll({
    where: {
      borrado: false
    }
  })
}

async function contarCodigoMaquinaria() {
  const today = format(new Date(), 'yyyyMMdd')
  const pattern = `M-${today}%`
  return await models.Maquinarias.count({
    where: {
      codMaquinaria: {
        [Op.like]: pattern
      }
    }
  })
}

async function buscarMaquinaria(id) {
  return await models.Maquinarias.findByPk(id, {
    where: {
      borrado: false
    }
  })
}

async function agregarMaquinaria(salon) {
  return await models.Maquinarias.create(salon)
}

async function modificarMaquinaria(id, cambio) {
  return await models.Maquinarias.update(cambio, { where: { id } })
}

async function eliminarMaquinaria(id) {
  const data = await models.Maquinarias.findByPk(id)
  return data.update({ borrado: true })
}

module.exports = {
  listarMaquinarias,
  buscarMaquinaria,
  agregarMaquinaria,
  modificarMaquinaria,
  eliminarMaquinaria,
  contarCodigoMaquinaria
}
