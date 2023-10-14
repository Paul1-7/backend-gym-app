const sequelize = require('../libs/sequelize.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/categorias.service.js')
const {
  agregarCategoriasDisciplinas,
  actualizarCategoriasDisciplinas
} = require('../services/categoriasDisciplinas.services.js')
const {
  agregarCategoriasMaquinarias,
  actualizarCategoriasMaquinarias
} = require('../services/categoriasMaquinarias.services.js')
const {
  agregarCategoriasProductos,
  actualizarCategoriasProductos
} = require('../services/categoriasProductos.services.js')

const msg = {
  notFound: 'Categoria no encontrado',
  deleteSuccess: 'Categoria eliminada correctamente',
  addSuccess: 'Categoria agregada correctamente',
  modifySuccess: 'Categoria modificada correctamente'
}

const typeService = {
  0: {
    service: {
      add: agregarCategoriasDisciplinas,
      modify: actualizarCategoriasDisciplinas
    },
    field: 'idDisciplina'
  },
  1: {
    service: {
      add: agregarCategoriasMaquinarias,
      modify: actualizarCategoriasMaquinarias
    },
    field: 'idMaquinaria'
  },
  2: {
    service: {
      add: agregarCategoriasProductos,
      modify: actualizarCategoriasProductos
    },
    field: 'idProducto'
  }
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
  const transaction = await sequelize.transaction()
  try {
    const { nombre, idsTipo, tipo } = req.body
    const { service, field } = typeService[tipo]

    const category = await services.AgregarCategoria(
      { nombre, tipo },
      { transaction }
    )

    const typeList = idsTipo.map((idTipo) => ({
      [field]: idTipo,
      idCategoria: category.toJSON().id
    }))

    await service.add(typeList, { transaction })

    await transaction.commit()
    res.json({ message: msg.addSuccess })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const modificarCategoria = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.params
    const { nombre, idsTipo, tipo } = req.body
    const { service, field } = typeService[tipo]

    await services.ModificarCategoria(id, { nombre }, { transaction })

    const typeList = idsTipo.map((idTipo) => ({
      [field]: idTipo,
      idCategoria: id
    }))

    await service.modify(id, typeList, { transaction })
    await transaction.commit()
    res.json({ message: msg.modifySuccess })
  } catch (error) {
    await transaction.rollback()
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
