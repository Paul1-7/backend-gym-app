const { models } = require('../libs/sequelize.js')

async function listarCategoriasDisciplinas({ where = {}, orderBy } = {}) {
  const options = {
    where: {
      estado: 1,
      ...where
    }
  }

  if (orderBy) {
    options.order = [orderBy]
  }
  return await models.Categorias_Disciplinas.findAll(options)
}

async function buscarCategoriaDisciplina(id) {
  return await models.Categorias_Disciplinas.findByPk(id, {
    where: {
      estado: 1
    }
  })
}

async function agregarCategoriaDisciplina(salon) {
  return await models.Categorias_Disciplinas.create(salon)
}

async function modificarCategoriaDisciplina(id, cambio) {
  return await models.Categorias_Disciplinas.update(cambio, { where: { id } })
}

async function eliminarCategoriaDisciplina(id) {
  return models.Categorias_Disciplinas.update({ estado: 0 }, { where: { id } })
}

module.exports = {
  listarCategoriasDisciplinas,
  buscarCategoriaDisciplina,
  agregarCategoriaDisciplina,
  modificarCategoriaDisciplina,
  eliminarCategoriaDisciplina
}
