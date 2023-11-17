const { Op, where } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')
const { eliminarRolUsuario } = require('./rolesUsuarios.services')
const { hash } = require('bcrypt')
const sequelize = require('../libs/sequelize.js')
const { startOfDay, endOfDay } = require('date-fns')
const { SOCIO } = require('../config/roles.js')

async function obtenerEmpleados(active = false, query = {}) {
  const options = {
    include: ['roles', 'horarios']
  }

  if (active) {
    options.where = { estado: 1 }
  }

  const usuarios = await models.Usuarios.findAll(options)
  const empleados = usuarios.filter((usuario) => usuario.roles.length >= 2)

  return empleados
}

async function obtenerUsuariosPorRol(active = false, rolNames, query = {}) {
  const options = {
    where: {
      '$roles.nombre$': { [Op.in]: rolNames },
      ...query
    },
    include: ['roles', 'horarios']
  }

  if (active) options.where.estado = 1

  return await models.Usuarios.findAll(options)
}

async function buscarUsuario(id) {
  return await models.Usuarios.findByPk(id, {
    include: ['roles']
  })
}

async function buscarUsuarioPorOpciones(options) {
  return await models.Usuarios.findOne({
    where: options,
    include: [
      {
        model: models.Roles,
        as: 'roles',
        through: {
          attributes: []
        },
        include: [
          {
            attributes: ['id'],
            model: models.Submenus,
            as: 'submenus',
            through: { attributes: [] }
          }
        ]
      }
    ]
  })
}

async function crearUsuario(User, options = {}) {
  return await models.Usuarios.create(User, options)
}

async function actualizarUsuario(id, changes, options = {}) {
  const { password } = changes

  const user = await models.Usuarios.findByPk(id)

  const passwordHashed =
    password !== '' && password
      ? await hash(password, 10)
      : user.dataValues.password

  return await user?.update({ ...changes, password: passwordHashed }, options)
}

async function borrarUsuario(id) {
  const user = await models.Usuarios.findByPk(id, {
    include: [
      'horarios',
      'programacion',
      'suscripciones',
      'ventasVendedor',
      'ventasSocios'
    ]
  })
  if (
    user.horarios.length > 0 ||
    user.ventasVendedor.length > 0 ||
    user.ventasSocios.length > 0 ||
    user.suscripciones.length > 0
  )
    return new Error(msg.msgErrorForeignKey)

  await eliminarRolUsuario(id)
  return await user?.destroy()
}

async function obtenerSociosMayorSuscripcion({
  dateStart: dateStartISO,
  dateEnd: dateEndISO
}) {
  const hasDate = dateStartISO && dateEndISO
  let whereOptions = {}

  if (hasDate) {
    const dateStart = startOfDay(new Date(dateStartISO)).toISOString()
    const dateEnd = endOfDay(new Date(dateEndISO)).toISOString()

    whereOptions = {
      '$suscripciones.fecha_inicio$': {
        [Op.between]: [dateStart, dateEnd]
      }
    }
  }
  return await models.Usuarios.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('suscripciones.id')), 'numSuscrip'],
      [sequelize.col('Usuarios.nombre'), 'nombre'],
      'apellidoP',
      'apellidoM',
      'ci'
    ],
    include: [
      {
        model: models.Suscripciones,
        as: 'suscripciones',
        attributes: [],
        include: [
          {
            model: models.Planes,
            as: 'plan',
            attributes: []
          }
        ]
      }
    ],
    where: whereOptions,
    group: ['Usuarios.nombre', 'apellido_p', 'apellido_m', 'ci'],
    order: [[sequelize.literal('"numSuscrip"'), 'DESC']],
    raw: true
  })
}

async function obtenerSociosMasCompradores({
  dateStart: dateStartISO,
  dateEnd: dateEndISO
}) {
  try {
    const hasDate = dateStartISO && dateEndISO
    let whereOptions = {}

    if (hasDate) {
      const dateStart = startOfDay(new Date(dateStartISO)).toISOString()
      const dateEnd = endOfDay(new Date(dateEndISO)).toISOString()

      whereOptions = {
        '$ventasSocios.fecha$': {
          [Op.between]: [dateStart, dateEnd]
        }
      }
    }

    const sociosMasCompradores = await models.Usuarios.findAll({
      attributes: [
        'id',
        'nombre',
        'apellidoP',
        'apellidoM',
        [
          sequelize.fn('COUNT', sequelize.col('ventasSocios.id')),
          'totalCompras'
        ]
      ],
      include: [
        {
          model: models.Ventas,
          as: 'ventasSocios',
          attributes: []
        }
      ],
      where: {
        estado: 1,
        ...whereOptions
      },
      group: ['Usuarios.id', 'nombre', 'apellidoP', 'apellidoM'],
      having: sequelize.literal('COUNT("ventasSocios"."id") > 0'),
      order: [[sequelize.literal('"totalCompras"'), 'DESC']]
    })

    return sociosMasCompradores
  } catch (error) {
    throw error
  }
}

async function obtenerEntrenadoresMasProgramaciones({
  dateStart: dateStartISO,
  dateEnd: dateEndISO
} = {}) {
  try {
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

    const entrenadoresMasProgramaciones = await models.Usuarios.findAll({
      attributes: [
        'id',
        'nombre',
        'apellidoP',
        'apellidoM',
        [
          sequelize.fn('COUNT', sequelize.col('horarios.programaciones.id')),
          'totalProgramaciones'
        ]
      ],
      include: [
        {
          model: models.Horarios,
          as: 'horarios',
          attributes: [],
          include: [
            {
              model: models.Programacion,
              as: 'programaciones',
              attributes: [],
              where: whereOptions
            }
          ]
        }
      ],
      where: {
        estado: 1
      },
      group: ['Usuarios.id', 'nombre', 'apellido_p', 'apellido_m'],
      having: sequelize.literal('COUNT("horarios->programaciones"."id") > 0'),
      order: [[sequelize.literal('"totalProgramaciones"'), 'DESC']],
      raw: true
    })

    return entrenadoresMasProgramaciones
  } catch (error) {
    throw error
  }
}

async function obtenerSociosMasProgramaciones({
  dateStart: dateStartISO,
  dateEnd: dateEndISO
} = {}) {
  try {
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

    const sociosMasProgramaciones = await models.Detalle_Programacion.findAll({
      attributes: [
        [sequelize.col('socio.nombre'), 'nombre'],
        [sequelize.col('socio.apellido_p'), 'apellidoP'],
        [sequelize.col('socio.apellido_m'), 'apellidoM'],
        [
          sequelize.fn('COUNT', sequelize.col('id_socio')),
          'totalProgramaciones'
        ]
      ],
      include: [
        {
          model: models.Usuarios,
          as: 'socio',
          attributes: [],
          where: {
            estado: 1
          }
        },
        {
          model: models.Programacion,
          as: 'programacion',
          attributes: [],
          where: whereOptions
        }
      ],
      group: ['socio.nombre', 'socio.apellido_p', 'socio.apellido_m'],
      order: [[sequelize.literal('"totalProgramaciones"'), 'DESC']]
    })

    return sociosMasProgramaciones
  } catch (error) {
    throw error
  }
}

module.exports = {
  buscarUsuario,
  crearUsuario,
  actualizarUsuario,
  obtenerEmpleados,
  obtenerUsuariosPorRol,
  borrarUsuario,
  buscarUsuarioPorOpciones,
  obtenerSociosMayorSuscripcion,
  obtenerSociosMasCompradores,
  obtenerEntrenadoresMasProgramaciones,
  obtenerSociosMasProgramaciones
}
