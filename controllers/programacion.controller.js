const sequelize = require('../libs/sequelize.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {
  agregarSocioProgramacion,
  eliminarSocioProgramacion
} = require('../services/detalleProgramacion.service.js')
const services = require('../services/programacion.service.js')
const { generateCodeToDocuments } = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Programacion no encontrada',
  notValid: 'La informacion es incorrecta',
  addSuccess: 'Se registró la programacion correctamente',
  modifySuccess: 'Se actualizó el registró de la programacion correctamente'
}

const listarProgramaciones = async (req, res, next) => {
  try {
    const { query } = req
    const hasQuery = !!Object.keys(query).length

    const data = await services.listarProgramacion(hasQuery ? query : null)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const buscarProgramacionPorId = async (req, res, next) => {
  try {
    const { id } = req.params
    const venta = await services.buscarProgramacion(id)

    if (!venta) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(venta)
  } catch (error) {
    next(error)
  }
}

const agregarProgramacion = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { body } = req
    const { detalle, programacion } = body

    const scheduleCode = await services.contarCodigoProgramacion()
    const newSchedule = await services.agregarProgramacion(
      {
        ...programacion,
        codProgramacion: generateCodeToDocuments('V', scheduleCode)
      },
      { transaction }
    )

    const scheduleDetail = detalle.map((detail) => {
      return {
        ...detail,
        idProgramacion: newSchedule.id
      }
    })

    await agregarSocioProgramacion(scheduleDetail, { transaction })

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const modificarProgramacion = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { detalle, programacion } = req.body

    const newSchedule = await services.agregarProgramacion(programacion, {
      transaction
    })

    const scheduleDetail = detalle.map((detail) => {
      return {
        ...detail,
        idProgramacion: newSchedule.id
      }
    })
    await eliminarSocioProgramacion(programacion.id, { transaction })
    await agregarSocioProgramacion(scheduleDetail, { transaction })

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarProgramaciones,
  buscarProgramacionPorId,
  agregarProgramacion,
  modificarProgramacion
}
