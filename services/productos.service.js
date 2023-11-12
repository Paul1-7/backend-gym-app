const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')
const sequelize = require('../libs/sequelize.js')
const { startOfDay, endOfDay } = require('date-fns')

async function ListarProductos({ where = {}, orderBy }) {
  const options = {
    where,
    include: ['categoria']
  }

  if (orderBy) {
    options.order = [orderBy]
  }
  return await models.Productos.findAll(options)
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

async function productosMasVendidos({
  dateStart: dateStartISO,
  dateEnd: dateEndISO
}) {
  const hasDate = dateStartISO && dateEndISO
  let whereOptions = {}

  if (hasDate) {
    const dateStart = startOfDay(new Date(dateStartISO)).toISOString()
    const dateEnd = endOfDay(new Date(dateEndISO)).toISOString()

    whereOptions = {
      '$detalleVentas.venta.fecha$': {
        [Op.between]: [dateStart, dateEnd]
      }
    }
  }
  return await models.Productos.findAll({
    attributes: [
      'id',
      'nombre',
      [
        sequelize.fn('SUM', sequelize.col('detalleVentas.cantidad')),
        'totalVentas'
      ]
    ],
    include: [
      {
        model: models.Detalle_Ventas,
        as: 'detalleVentas',
        attributes: [],
        include: [{ model: models.Ventas, as: 'venta', attributes: [] }]
      },
      {
        model: models.Categorias_Productos,
        as: 'categoria',
        attributes: ['nombre']
      }
    ],
    where: whereOptions,
    group: [
      'Productos.id',
      'Productos.nombre',
      'categoria.nombre',
      'categoria.id'
    ],
    order: [[sequelize.literal('"totalVentas"'), 'DESC']]
  })
}

module.exports = {
  ListarProductos,
  BuscarProducto,
  AgregarProducto,
  ModificarProducto,
  EliminarProducto,
  BuscarProductosPorIds,
  ActualizarStockPorIds,
  productosMasVendidos
}
