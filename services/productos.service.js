const { models } = require('../libs/sequelize.js')

async function ListarProductos() {
  return await models.Productos.findAll()
}

async function BuscarProducto(id) {
  return await models.Productos.findByPk(id)
}

async function AgregarProducto(producto) {
  return await models.Productos.create(producto)
}

async function ModificarProducto(id, cambio) {
  const producto = await models.Productos.findByPk(id)
  return await producto?.update(cambio)
}

async function EliminarProducto(id) {
  const producto = await models.Productos.findByPk(id)
  return await producto?.destroy()
}

module.exports = {
  ListarProductos,
  BuscarProducto,
  AgregarProducto,
  ModificarProducto,
  EliminarProducto
}
