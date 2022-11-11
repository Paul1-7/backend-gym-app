const { models } = require('../libs/sequelize.js')

async function AgregarDetalleVenta(data) {
  return await models.Detalle_Ventas.bulkCreate(data)
}

module.exports = {
  AgregarDetalleVenta
}
