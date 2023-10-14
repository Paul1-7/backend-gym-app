const { models } = require('../libs/sequelize.js')

async function agregarCategoriasDisciplinas(data, options = {}) {
  return await models.Categorias_Disciplinas.bulkCreate(data, options)
}

async function eliminarCategoriasDisciplinas(idCategoria, options = {}) {
  return await models.Categorias_Disciplinas.destroy({
    where: { idCategoria },
    ...options
  })
}

async function actualizarCategoriasDisciplinas(
  idCategoria,
  data,
  options = {}
) {
  await eliminarCategoriasDisciplinas(idCategoria, options)
  await agregarCategoriasDisciplinas(data, options)
}

module.exports = {
  agregarCategoriasDisciplinas,
  eliminarCategoriasDisciplinas,
  actualizarCategoriasDisciplinas
}
