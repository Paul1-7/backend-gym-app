const { models } = require('../libs/sequelize.js')

async function agregarCategoriasProductos(data, options = {}) {
  return await models.Categorias_Productos.bulkCreate(data, options)
}

async function eliminarCategoriasProductos(idCategoria, options = {}) {
  return await models.Categorias_Productos.destroy({
    where: { idCategoria },
    ...options
  })
}

async function actualizarCategoriasProductos(idCategoria, data, options = {}) {
  await eliminarCategoriasProductos(idCategoria, options)
  return await agregarCategoriasProductos(data, options)
}

module.exports = {
  agregarCategoriasProductos,
  eliminarCategoriasProductos,
  actualizarCategoriasProductos
}
