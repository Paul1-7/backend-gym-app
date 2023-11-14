const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const { format, startOfDay, endOfDay } = require('date-fns')
const sequelize = require('../libs/sequelize.js')

async function listarProgramacion(query = '') {
  return await models.Programacion.findAll({
    include: [
      {
        model: models.Detalle_Programacion,
        as: 'detalle'
      },
      {
        model: models.Horarios,
        as: 'horario',
        include: [
          {
            model: models.Usuarios,
            as: 'entrenador',
            attributes: ['id', 'nombre', 'apellidoP']
          },
          {
            model: models.Disciplinas,
            as: 'disciplina',
            attributes: ['id', 'nombre']
          },
          {
            model: models.Salones,
            as: 'salon',
            attributes: ['id', 'nombre', 'capacidad']
          }
        ]
      }
    ],
    where: {
      ...query
    }
  })
}

async function obtenerInterseccionSociosProgramacion({
  fecha,
  horaEntrada,
  horaSalida
}) {
  return await models.Programacion.findAll({
    include: [
      {
        model: models.Detalle_Programacion,
        as: 'detalle',
        include: [
          {
            model: models.Usuarios,
            as: 'socio',
            attributes: ['id', 'nombre', 'apellidoP']
          }
        ]
      },
      {
        model: models.Horarios,
        as: 'horario',
        where: {
          [Op.or]: [
            {
              horaEntrada: {
                [Op.lt]: horaSalida
              },
              horaSalida: {
                [Op.gt]: horaEntrada
              }
            }
          ]
        }
      }
    ],
    where: { fecha }
  })
}

async function obtenerDisciplinasMasProgramadas({
  dateStart: dateStartISO,
  dateEnd: dateEndISO
} = {}) {
  const hasDate = dateStartISO && dateEndISO
  let whereOptions = {}

  if (hasDate) {
    const dateStart = startOfDay(new Date(dateStartISO)).toISOString()
    const dateEnd = endOfDay(new Date(dateEndISO)).toISOString()

    whereOptions = {
      fecha: {
        [Op.between]: [dateStart, dateEnd]
      }
    }
  }

  try {
    const disciplinasMasProgramadas = await models.Programacion.findAll({
      attributes: [
        [sequelize.col('horario.disciplina.nombre'), 'nombre'],
        [
          sequelize.fn('COUNT', sequelize.col('horario.id_disciplina')),
          'totalProgramaciones'
        ]
      ],
      include: [
        {
          model: models.Horarios,
          as: 'horario',
          attributes: [],
          include: [
            {
              model: models.Disciplinas,
              as: 'disciplina',
              attributes: []
            }
          ]
        }
      ],
      where: whereOptions,
      group: ['nombre'],
      order: [[sequelize.literal('"totalProgramaciones"'), 'DESC']]
    })

    return disciplinasMasProgramadas
  } catch (error) {
    throw error
  }
}

async function contarCodigoProgramacion() {
  const today = format(new Date(), 'yyyyMMdd')
  const pattern = `PR-${today}%`
  return await models.Programacion.count({
    where: {
      codProgramacion: {
        [Op.like]: pattern
      }
    }
  })
}

async function listarProgramacionPersonalizada({ fechaInicio, fechaFin }) {
  const options = { include: ['horarios'] }
  const isRange = fechaInicio && fechaFin

  if (isRange) {
    options.where = {
      fecha: { [Op.between]: [fechaInicio, fechaFin] }
    }
  }

  options.where = {
    fecha: { [Op.gte]: fechaInicio }
  }

  return await models.Programacion.findAll(options)
}

async function buscarProgramacion(id) {
  return await models.Programacion.findByPk(id, {
    include: [
      'detalle',
      {
        association: 'detalle',
        include: [{ association: 'socio' }]
      },
      {
        model: models.Horarios,
        as: 'horario',
        include: [
          {
            model: models.Usuarios,
            as: 'entrenador',
            attributes: ['id', 'nombre', 'apellidoP']
          },
          {
            model: models.Disciplinas,
            as: 'disciplina',
            attributes: ['id', 'nombre']
          },
          {
            model: models.Salones,
            as: 'salon',
            attributes: ['id', 'nombre', 'capacidad']
          }
        ]
      }
    ]
  })
}

async function agregarProgramacion(programacion, options = {}) {
  return await (
    await models.Programacion.create(programacion, options)
  ).toJSON()
}

async function modificarProgramacion(id, cambio, options = {}) {
  return await models.Programacion.update(cambio, { where: { id }, ...options })
}

module.exports = {
  listarProgramacion,
  buscarProgramacion,
  agregarProgramacion,
  modificarProgramacion,
  listarProgramacionPersonalizada,
  contarCodigoProgramacion,
  obtenerInterseccionSociosProgramacion,
  obtenerDisciplinasMasProgramadas
}
