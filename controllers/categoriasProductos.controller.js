const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/categoriasProductos.services.js')

const msg = {
  notFound: 'Categoria de producto no encontrada',
  deleteSuccess: 'Categoria de producto eliminada',
  addSuccess: 'Categoria de producto agregada correctamente',
  modifySuccess: 'Categoria de producto modificada correctamente'
}

const listarCategoriasProductos = async (req, res, next) => {
  try {
    const categoriesProducts = await services.listarCategoriasProductos()
    res.json(categoriesProducts)
  } catch (error) {
    next(error)
  }
}

const buscarCategoriaProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.buscarCategoriaProducto(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const agregarCategoriaProducto = async (req, res, next) => {
  try {
    const { body } = req
    await services.agregarCategoriaProducto(body)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const modificarCategoriaProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const data = await services.modificarCategoriaProducto(id, body)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const eliminarCategoriaProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.eliminarCategoriaProducto(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.deleteSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarCategoriasProductos,
  buscarCategoriaProducto,
  agregarCategoriaProducto,
  modificarCategoriaProducto,
  eliminarCategoriaProducto
}
