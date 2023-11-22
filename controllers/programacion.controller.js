const sequelize = require('../libs/sequelize.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {
  agregarSocioProgramacion,
  modificarSocioProgramacion
} = require('../services/detalleProgramacion.service.js')
const {
  verificarDisponibilidadMedianteHora,
  buscarHorarioPorId
} = require('../services/horarios.service.js')
const services = require('../services/programacion.service.js')
const { generateCodeToDocuments } = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Programacion no encontrada',
  notValid: 'La informacion es incorrecta',
  addSuccess: 'Se registró la programacion correctamente',
  modifySuccess: 'Se actualizó el registró de la programacion correctamente',
  trainersWithSameSchedule:
    'Se observa que el horario asignado para desempeñar el rol de entrenador coincide con el horario de la clase en la que intenta participar un usuario',
  partnersWithSameSchedule: (name) =>
    `El participante con el nombre "${name}" ya tiene registro en otra clase.`
}

const getAvailabilityTrainer = async (schedule, idHorario, participants) => {
  const trainersWithDistincSchedule = await verificarDisponibilidadMedianteHora(
    {
      ...schedule,
      idHorario
    }
  )

  if (!trainersWithDistincSchedule.length) return false

  const { idEntrenador } = trainersWithDistincSchedule[0]

  return participants.some(({ idSocio }) => idSocio === idEntrenador)
}

const getAvailabilityPartners = async (data, detail) => {
  const participants = detail.map(({ idSocio }) => idSocio)
  const partnerWithSameSchedule =
    await services.obtenerInterseccionSociosProgramacion({
      ...data,
      participants
    })

  if (!partnerWithSameSchedule.length) return false

  const { nombre, apellidoP, apellidoM } =
    partnerWithSameSchedule[0].detalle[0].socio
  const fullname = `${nombre} ${apellidoP} ${apellidoM}`

  return fullname

  //  return participants.some(({ idSocio }) => idSocio === idEntrenador)
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

const obtenerDisciplinasMasProgramadas = async (req, res, next) => {
  try {
    const { query } = req
    const data = await services.obtenerDisciplinasMasProgramadas(query)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const obtenerInterseccionSociosProgramacion = async (req, res, next) => {
  try {
    const { query } = req

    const data = await services.obtenerInterseccionSociosProgramacion(query)
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

    const schedule = await buscarHorarioPorId(programacion.idHorario)

    const availablePartner = await getAvailabilityPartners(
      {
        ...schedule,
        fecha: programacion.fecha
      },
      detalle
    )

    if (availablePartner) {
      return ERROR_RESPONSE.notAcceptable(
        msg.partnersWithSameSchedule(availablePartner),
        res
      )
    }

    const isAvaliableTrainer = await getAvailabilityTrainer(
      schedule,
      programacion.idHorario,
      detalle
    )

    if (isAvaliableTrainer) {
      return ERROR_RESPONSE.notAcceptable(msg.trainersWithSameSchedule, res)
    }

    const scheduleCode = await services.contarCodigoProgramacion()
    const newSchedule = await services.agregarProgramacion(
      {
        ...programacion,
        codProgramacion: generateCodeToDocuments('PR', scheduleCode)
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

    await transaction.commit()
    res.json({ message: msg.addSuccess })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const modificarProgramacion = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.params
    const { detalle, programacion } = req.body

    const schedule = await buscarHorarioPorId(programacion.idHorario)

    const availablePartner = await getAvailabilityPartners(
      {
        ...schedule,
        fecha: programacion.fecha,
        idProgramacion: id
      },
      detalle
    )
    if (availablePartner) {
      return ERROR_RESPONSE.notAcceptable(
        msg.partnersWithSameSchedule(availablePartner),
        res
      )
    }

    const isAvaliableTrainer = await getAvailabilityTrainer(
      schedule,
      programacion.idHorario,
      detalle
    )
    if (isAvaliableTrainer) {
      return ERROR_RESPONSE.notAcceptable(msg.trainersWithSameSchedule, res)
    }

    await services.modificarProgramacion(id, programacion, {
      transaction
    })

    const scheduleDetail = detalle.map((detail) => {
      return {
        ...detail,
        idProgramacion: id
      }
    })
    await modificarSocioProgramacion(id, scheduleDetail, { transaction })
    await transaction.commit()
    res.json({ message: msg.modifySuccess })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

module.exports = {
  listarProgramaciones,
  buscarProgramacionPorId,
  agregarProgramacion,
  modificarProgramacion,
  obtenerInterseccionSociosProgramacion,
  obtenerDisciplinasMasProgramadas
}
