const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const { format } = require('date-fns')

async function ListarVentas() {
  return await models.Ventas.findAll({
    include: ['socio', 'vendedor']
  })
}

async function ContarCodigoVenta() {
  const today = format(new Date(), 'yyyyMMdd')
  const pattern = `V-${today}%`
  return await models.Ventas.count({
    where: {
      codVenta: {
        [Op.like]: pattern
      }
    }
  })
}

async function ListarVentasPersonalizada({ fechaInicio, fechaFin }) {
  const options = { include: ['socio', 'vendedor'] }
  const isRange = fechaInicio && fechaFin

  if (isRange) {
    options.where = {
      fecha: { [Op.between]: [fechaInicio, fechaFin] }
    }
  }

  options.where = {
    fecha: { [Op.gte]: fechaInicio }
  }

  return await models.Ventas.findAll(options)
}

async function BuscarVenta(id) {
  return await models.Ventas.findByPk(id, {
    include: [
      'socio',
      'vendedor',
      'detalle',

      {
        association: 'detalle',
        include: [{ association: 'productos' }]
      }
    ]
  })
}

async function AgregarVenta(venta) {
  return await (await models.Ventas.create(venta)).toJSON()
}

async function ModificarVenta(id, cambio) {
  const venta = await models.Ventas.findByPk(id)
  return await venta?.update(cambio)
}

async function EliminarVenta(id) {
  const venta = await models.Ventas.findByPk(id)
  return await venta?.destroy()
}

module.exports = {
  ListarVentas,
  BuscarVenta,
  AgregarVenta,
  ModificarVenta,
  EliminarVenta,
  ListarVentasPersonalizada,
  ContarCodigoVenta
}
