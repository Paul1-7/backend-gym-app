const { models } = require('../libs/sequelize.js')

async function listarCategoriasProductos({ where = {}, orderBy } = {}) {
  const options = {
    where: {
      estado: 1,
      ...where
    }
  }

  if (orderBy) {
    options.order = [orderBy]
  }
  return await models.Categorias_Productos.findAll(options)
}

async function buscarCategoriaProducto(id) {
  return await models.Categorias_Productos.findByPk(id, {
    where: {
      estado: 1
    }
  })
}

async function agregarCategoriaProducto(salon) {
  return await models.Categorias_Productos.create(salon)
}

async function modificarCategoriaProducto(id, cambio) {
  return await models.Categorias_Productos.update(cambio, { where: { id } })
}

async function eliminarCategoriaProducto(id) {
  const data = await models.Categorias_Productos.findByPk(id)
  return data.update({ estado: 0 })
}

module.exports = {
  listarCategoriasProductos,
  buscarCategoriaProducto,
  agregarCategoriaProducto,
  modificarCategoriaProducto,
  eliminarCategoriaProducto
}
