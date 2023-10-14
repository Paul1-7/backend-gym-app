const { models } = require('../libs/sequelize.js')

async function agregarCategoriasMaquinarias(data, options = {}) {
  return await models.Categorias_Maquinarias.bulkCreate(data, options)
}

async function eliminarCategoriasMaquinarias(idCategoria, options = {}) {
  return await models.Categorias_Maquinarias.destroy({
    where: { idCategoria },
    ...options
  })
}

async function actualizarCategoriasMaquinarias(
  idCategoria,
  data,
  options = {}
) {
  await eliminarCategoriasMaquinarias(idCategoria, options)
  return await agregarCategoriasMaquinarias(data, options)
}

module.exports = {
  agregarCategoriasMaquinarias,
  eliminarCategoriasMaquinarias,
  actualizarCategoriasMaquinarias
}
