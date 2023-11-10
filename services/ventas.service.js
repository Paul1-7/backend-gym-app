const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const { format, startOfDay, endOfDay } = require('date-fns')

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
      fecha: { [Op.between]: [startOfDay(fechaInicio), endOfDay(fechaFin)] }
    }
  }

  options.where = {
    fecha: { [Op.gte]: startOfDay(fechaInicio) }
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

async function obtenerVentasPorFecha({
  dateStart: dateStartISO,
  dateEnd: dateEndISO,
  orderBy
}) {
  const hasDate = dateStartISO && dateEndISO
  let whereOptions = { include: ['socio', 'vendedor'], order: [orderBy] }

  if (hasDate) {
    const dateStart = startOfDay(new Date(dateStartISO)).toISOString()
    const dateEnd = endOfDay(new Date(dateEndISO)).toISOString()

    whereOptions = {
      ...whereOptions,
      fechaInicio: {
        [Op.between]: [dateStart, dateEnd]
      }
    }
  }

  return await models.Ventas.findAll(whereOptions)
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
  ContarCodigoVenta,
  obtenerVentasPorFecha
}
