const {
  PRODUCTS_REPORT_ORDER_BY,
  PRODUCTS_REPORT_CRITERIA
} = require('../constants/reports.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/productos.service.js')

const msg = {
  notFound: 'Producto no encontrado',
  deleteSuccess: 'Producto eliminado',
  addSuccess: 'Producto agregado correctamente',
  modifySuccess: 'Producto modificado correctamente'
}

const ListarProductos = async (req, res, next) => {
  try {
    const { orderBy, criterio } = req.query
    const selectedOrderBy = PRODUCTS_REPORT_ORDER_BY.find(
      ({ id }) => id === orderBy
    )
    const selectedCriterio = PRODUCTS_REPORT_CRITERIA?.[criterio] ?? {}

    const products = await services.ListarProductos({
      where: selectedCriterio,
      orderBy: selectedOrderBy?.criteria
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
}

const BuscarProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const salon = await services.BuscarProducto(id)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(salon)
  } catch (error) {
    next(error)
  }
}

const AgregarProducto = async (req, res, next) => {
  try {
    const { body } = req
    const { tieneVencimiento, fechaVencimiento } = body
    await services.AgregarProducto({
      ...body,
      fechaVencimiento: JSON.parse(tieneVencimiento) ? fechaVencimiento : null
    })
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const { tieneVencimiento, fechaVencimiento } = body
    const producto = await services.ModificarProducto(id, {
      ...body,
      fechaVencimiento: tieneVencimiento ? fechaVencimiento : null
    })

    if (!producto) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const EliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const existeProducto = await services.BuscarProducto(id)
    if (!existeProducto) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const productoBorrado = await services.EliminarProducto(id)

    if (productoBorrado instanceof Error)
      return ERROR_RESPONSE.notAcceptable(productoBorrado.message, res)

    res.json({ message: msg.deleteSuccess, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarProductos,
  BuscarProducto,
  AgregarProducto,
  ModificarProducto,
  EliminarProducto
}
