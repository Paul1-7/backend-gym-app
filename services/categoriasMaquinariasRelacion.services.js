const { models } = require('../libs/sequelize.js')

async function agregarCategoriasMaquinariasRelacion(data, options = {}) {
  return await models.Categorias_Maquinarias_Relacion.bulkCreate(data, options)
}

async function eliminarCategoriasMaquinariasRelacion(
  idCategoria,
  options = {}
) {
  return await models.Categorias_Maquinarias_Relacion.destroy({
    where: { idCategoria },
    ...options
  })
}

async function actualizarCategoriasMaquinariasRelacion(
  idCategoria,
  data,
  options = {}
) {
  await eliminarCategoriasMaquinariasRelacion(idCategoria, options)
  return await agregarCategoriasMaquinariasRelacion(data, options)
}

module.exports = {
  agregarCategoriasMaquinariasRelacion,
  eliminarCategoriasMaquinariasRelacion,
  actualizarCategoriasMaquinariasRelacion
}
