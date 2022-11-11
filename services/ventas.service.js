const { models } = require('../libs/sequelize.js')

async function ListarVentas() {
  return await models.Ventas.findAll({
    include: ['socio', 'vendedor']
  })
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
  return await models.Ventas.create(venta)
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
  EliminarVenta
}
