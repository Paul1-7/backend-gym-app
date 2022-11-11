const { Op } = require('sequelize')
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

async function BuscarProductosPorIds(ids) {
  return await models.Productos.findAll({
    where: {
      id: { [Op.in]: ids }
    }
  })
}

async function ActualizarStockPorIds(newData) {
  return await models.Productos.bulkCreate(newData, {
    updateOnDuplicate: ['stock']
  })
}

module.exports = {
  ListarProductos,
  BuscarProducto,
  AgregarProducto,
  ModificarProducto,
  EliminarProducto,
  BuscarProductosPorIds,
  ActualizarStockPorIds
}
