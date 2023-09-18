const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/categorias.service.js')

const msg = {
  notFound: 'Categoria no encontrado',
  deleteSuccess: 'Categoria eliminada correctamente',
  addSuccess: 'Categoria agregada correctamente',
  modifySuccess: 'Categoria modificada correctamente'
}

const listarCategorias = async (req, res, next) => {
  try {
    const { query } = req

    const categorias = await services.ListarCategorias(
      'tipo' in query ? query : null
    )
    res.json(categorias)
  } catch (error) {
    next(error)
  }
}

const buscarCategorias = async (req, res, next) => {
  try {
    const { id } = req.params
    const categorias = await services.BuscarCategoria(id)

    if (!categorias) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(categorias)
  } catch (error) {
    next(error)
  }
}

const agregarCategorias = async (req, res, next) => {
  try {
    const { body } = req
    await services.AgregarCategoria(body)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const modificarCategoria = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const categoria = await services.ModificarCategoria(id, body)

    if (!categoria) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const eliminarCategoria = async (req, res, next) => {
  try {
    const { id } = req.params

    const isDeleted = await services.EliminarCategoria(id)

    if (!isDeleted) return ERROR_RESPONSE.notAcceptable(msg.notFound, res)

    res.json({ message: msg.deleteSuccess, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarCategorias,
  buscarCategorias,
  agregarCategorias,
  modificarCategoria,
  eliminarCategoria
}
