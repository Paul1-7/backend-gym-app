const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/categoriasMaquinarias.service.js')

const msg = {
  notFound: 'Categoria de equipamiento no encontrada',
  deleteSuccess: 'Categoria de equipamiento eliminada',
  addSuccess: 'Categoria de equipamiento agregada correctamente',
  modifySuccess: 'Categoria de equipamiento modificada correctamente'
}

const listarCategoriasMaquinarias = async (req, res, next) => {
  try {
    const categoriesProducts = await services.listarCategoriasMaquinarias()
    res.json(categoriesProducts)
  } catch (error) {
    next(error)
  }
}

const buscarCategoriaMaquinaria = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.buscarCategoriaMaquinaria(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const agregarCategoriaMaquinaria = async (req, res, next) => {
  try {
    const { body } = req
    await services.agregarCategoriaMaquinaria(body)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const modificarCategoriaMaquinaria = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const data = await services.modificarCategoriaMaquinaria(id, body)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const eliminarCategoriaMaquinaria = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.eliminarCategoriaMaquinaria(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.deleteSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarCategoriasMaquinarias,
  buscarCategoriaMaquinaria,
  agregarCategoriaMaquinaria,
  modificarCategoriaMaquinaria,
  eliminarCategoriaMaquinaria
}
