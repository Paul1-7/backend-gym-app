const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function ListarProductos() {
  return await models.Productos.findAll()
}

async function BuscarProducto(id) {
  return await models.Productos.findByPk(id)
}

async function AgregarProducto(producto, options = {}) {
  return await models.Productos.create(producto, options)
}

async function ModificarProducto(id, cambio) {
  const producto = await models.Productos.findByPk(id)
  return await producto?.update(cambio)
}

async function EliminarProducto(id) {
  const productos = await models.Productos.findByPk(id, {
    include: ['detalleVentas']
  })

  if (productos.detalleVentas.length > 0)
    return new Error(msg.msgErrorForeignKey)

  return await productos?.destroy()
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
