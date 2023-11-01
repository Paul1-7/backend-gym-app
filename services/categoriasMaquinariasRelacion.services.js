const { models } = require('../libs/sequelize.js')

async function agregarCategoriasMaquinariasRelacion(data, options = {}) {
  return await models.Categorias_Maquinarias_Relacion.bulkCreate(data, options)
}

async function eliminarCategoriasMaquinariasRelacion(
  idMaquinaria,
  options = {}
) {
  return await models.Categorias_Maquinarias_Relacion.destroy({
    where: { idMaquinaria },
    ...options
  })
}

async function actualizarCategoriasMaquinariasRelacion(
  idMaquinaria,
  data,
  options = {}
) {
  await eliminarCategoriasMaquinariasRelacion(idMaquinaria, options)
  return await agregarCategoriasMaquinariasRelacion(data, options)
}

module.exports = {
  agregarCategoriasMaquinariasRelacion,
  eliminarCategoriasMaquinariasRelacion,
  actualizarCategoriasMaquinariasRelacion
}
