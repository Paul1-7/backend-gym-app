const { SALES_REPORT_ORDER_BY } = require('../constants/reports.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { AgregarDetalleVenta } = require('../services/detalleVentas.service.js')
const {
  BuscarProductosPorIds,
  ActualizarStockPorIds
} = require('../services/productos.service.js')
const services = require('../services/ventas.service')
const {
  obtenerNuevoStock,
  generateCodeToDocuments
} = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Venta no encontrada',
  delete: 'Venta eliminada',
  notValid: 'La informacion es incorrecta',
  addSuccess: 'Se registró la venta correctamente',
  modifySuccess: 'Se actualizó el registró de la venta correctamente'
}

const obtenerTotalVenta = (detalle) => {
  return detalle.reduce(
    (sum, val) => sum + val.cantidad * val.precioAdquirido,
    0
  )
}

const ListarVentas = async (req, res, next) => {
  try {
    const venta = await services.ListarVentas()
    res.json(venta)
  } catch (error) {
    next(error)
  }
}

const obtenerVentasPorFecha = async (req, res, next) => {
  try {
    const { dateStart, dateEnd, orderBy } = req.query || {}

    if (!dateStart || !dateEnd || !orderBy)
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const selectedOption = SALES_REPORT_ORDER_BY.find(
      ({ id }) => id === orderBy
    )

    const options = {
      dateStart,
      dateEnd,
      orderBy: selectedOption.criteria
    }

    const sales = await services.obtenerVentasPorFecha(options)
    res.json(sales)
  } catch (error) {
    next(error)
  }
}

const BuscarVenta = async (req, res, next) => {
  try {
    const { id } = req.params
    const venta = await services.BuscarVenta(id)

    if (!venta) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(venta)
  } catch (error) {
    next(error)
  }
}

const AgregarVenta = async (req, res, next) => {
  try {
    const { body } = req
    const { productos, ...sell } = body

    const productsId = productos.map((product) => product.id)

    const productosReq = await BuscarProductosPorIds(productsId)
    const numberSaleCode = await services.ContarCodigoVenta()

    if (productosReq.length !== productos.length)
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const newStock = obtenerNuevoStock(productosReq, productos)

    if (!newStock.every(({ stock }) => stock >= 0))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    let sellDetail = newStock.map((value) => {
      const product = productos.find((product) => product.id === value.id)

      const { precioVenta } = productosReq.find(({ id }) => id === value.id)

      return {
        idProd: product.id,
        cantidad: product.cantidad,
        precioAdquirido: precioVenta
      }
    })
    const newSell = await services.AgregarVenta({
      ...sell,
      fecha: new Date(),
      total: obtenerTotalVenta(sellDetail),
      codVenta: generateCodeToDocuments('V', numberSaleCode)
    })
    sellDetail = sellDetail.map((sell) => ({ ...sell, idVenta: newSell.id }))

    await AgregarDetalleVenta(sellDetail)
    await ActualizarStockPorIds(newStock)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarVenta = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const venta = await services.ModificarVenta(id, body)

    if (!venta) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(venta)
  } catch (error) {
    next(error)
  }
}

const EliminarVenta = async (req, res, next) => {
  try {
    const { id } = req.params
    const venta = await services.EliminarVenta(id)

    if (!venta) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarVentas,
  BuscarVenta,
  AgregarVenta,
  ModificarVenta,
  EliminarVenta,
  obtenerVentasPorFecha
}
