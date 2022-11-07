const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/productos.service.js')

const msg = {
  notFound: 'Producto no encontrado',
  delete: 'Producto eliminado',
  addSuccess: 'Producto agregado correctamente'
}

const ListarProductos = async (req, res, next) => {
  try {
    const salones = await services.ListarProductos()
    res.json(salones)
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
    await services.AgregarProducto(body)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const salon = await services.ModificarProducto(id, body)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(salon)
  } catch (error) {
    next(error)
  }
}

const EliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const salon = await services.EliminarProducto(id)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
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
