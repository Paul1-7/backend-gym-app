const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/categoriasDisciplinas.services.js')

const msg = {
  notFound: 'Categoria de disciplina no encontrada',
  deleteSuccess: 'Categoria de disciplina eliminada',
  addSuccess: 'Categoria de disciplina agregada correctamente',
  modifySuccess: 'Categoria de disciplina modificada correctamente'
}

const listarCategoriasDisciplinas = async (req, res, next) => {
  try {
    const categoriesProducts = await services.listarCategoriasDisciplinas()
    res.json(categoriesProducts)
  } catch (error) {
    next(error)
  }
}

const buscarCategoriaDisciplina = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.buscarCategoriaDisciplina(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const agregarCategoriaDisciplina = async (req, res, next) => {
  try {
    const { body } = req
    await services.agregarCategoriaDisciplina(body)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const modificarCategoriaDisciplina = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const data = await services.modificarCategoriaDisciplina(id, body)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const eliminarCategoriaDisciplina = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.eliminarCategoriaDisciplina(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.deleteSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarCategoriasDisciplinas,
  buscarCategoriaDisciplina,
  agregarCategoriaDisciplina,
  modificarCategoriaDisciplina,
  eliminarCategoriaDisciplina
}
