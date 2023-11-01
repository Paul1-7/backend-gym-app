const { format } = require('date-fns')
const { models } = require('../libs/sequelize.js')
const { Op } = require('sequelize')

async function listarMaquinarias({ where = {}, orderBy }) {
  const options = {
    where: {
      borrado: false,
      ...where
    },
    include: [
      {
        model: models.Categorias_Maquinarias,
        through: { attributes: [] },
        as: 'categorias'
      }
    ]
  }

  if (orderBy) {
    options.order = [orderBy]
  }
  return await models.Maquinarias.findAll(options)
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
    },
    include: [
      {
        model: models.Categorias_Maquinarias,
        through: { attributes: [] },
        as: 'categorias'
      }
    ]
  })
}

async function agregarMaquinaria(data, options = {}) {
  return await models.Maquinarias.create(data, options)
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
