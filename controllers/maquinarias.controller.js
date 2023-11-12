const {
  EQUIPMENTS_REPORT_ORDER_BY,
  EQUIPMENTS_REPORT_CRITERIA
} = require('../constants/reports.js')
const sequelize = require('../libs/sequelize.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {
  agregarCategoriasMaquinariasRelacion,
  actualizarCategoriasMaquinariasRelacion
} = require('../services/categoriasMaquinariasRelacion.services.js')
const services = require('../services/maquinarias.service.js')
const { generateCodeToDocuments } = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Maquinaria no encontrada',
  deleteSuccess: 'Maquinaria eliminada',
  addSuccess: 'Maquinaria agregada correctamente',
  modifySuccess: 'Maquinaria modificada correctamente'
}

const listarMaquinarias = async (req, res, next) => {
  try {
    const { orderBy, criterio, idCategoria } = req.query ?? {}

    const selectedOrderBy = EQUIPMENTS_REPORT_ORDER_BY.find(
      ({ id }) => id === orderBy
    )
    let selectedCriterio = EQUIPMENTS_REPORT_CRITERIA?.[criterio] ?? {}

    if (criterio === '5') {
      selectedCriterio = { '$categorias.id$': idCategoria }
    }

    const maquinaria = await services.listarMaquinarias({
      where: selectedCriterio,
      orderBy: selectedOrderBy?.criteria
    })
    res.json(maquinaria)
  } catch (error) {
    next(error)
  }
}

const buscarMaquinaria = async (req, res, next) => {
  try {
    const { id } = req.params
    const salon = await services.buscarMaquinaria(id)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(salon)
  } catch (error) {
    next(error)
  }
}

const agregarMaquinaria = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { body } = req
    const machineCode = await services.contarCodigoMaquinaria()

    const savedEquipment = await services.agregarMaquinaria(
      {
        ...body,
        codMaquinaria: generateCodeToDocuments('M', machineCode)
      },
      { transaction }
    )

    const categories = body.idCategoria.map((idCategoria) => ({
      idCategoria,
      idMaquinaria: savedEquipment.toJSON().id
    }))

    await agregarCategoriasMaquinariasRelacion(categories, { transaction })
    await transaction.commit()
    res.json({ message: msg.addSuccess })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const modificarMaquinaria = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.params
    const { body } = req
    const data = await services.modificarMaquinaria(id, body)

    const categories = body.idCategoria.map((idCategoria) => ({
      idCategoria,
      idMaquinaria: id
    }))

    await actualizarCategoriasMaquinariasRelacion(id, categories, {
      transaction
    })
    await transaction.commit()

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const eliminarMaquinaria = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.eliminarMaquinaria(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.deleteSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarMaquinarias,
  buscarMaquinaria,
  agregarMaquinaria,
  modificarMaquinaria,
  eliminarMaquinaria
}
