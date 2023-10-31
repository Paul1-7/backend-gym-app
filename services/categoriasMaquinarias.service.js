const { models } = require('../libs/sequelize.js')

async function listarCategoriasMaquinarias({ where = {}, orderBy } = {}) {
  const options = {
    where: {
      estado: 1,
      ...where
    }
  }

  if (orderBy) {
    options.order = [orderBy]
  }
  return await models.Categorias_Maquinarias.findAll(options)
}

async function buscarCategoriaMaquinaria(id) {
  return await models.Categorias_Maquinarias.findByPk(id, {
    where: {
      estado: 1
    }
  })
}

async function agregarCategoriaMaquinaria(salon) {
  return await models.Categorias_Maquinarias.create(salon)
}

async function modificarCategoriaMaquinaria(id, cambio) {
  return await models.Categorias_Maquinarias.update(cambio, { where: { id } })
}

async function eliminarCategoriaMaquinaria(id) {
  return models.Categorias_Maquinarias.update({ estado: 0 }, { where: { id } })
}

module.exports = {
  listarCategoriasMaquinarias,
  buscarCategoriaMaquinaria,
  agregarCategoriaMaquinaria,
  modificarCategoriaMaquinaria,
  eliminarCategoriaMaquinaria
}
