const { Op, where } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')
const { eliminarRolUsuario } = require('./rolesUsuarios.services')
const { hash } = require('bcrypt')
const sequelize = require('../libs/sequelize.js')
const { startOfDay, endOfDay } = require('date-fns')

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

module.exports = {
  buscarUsuario,
  crearUsuario,
  actualizarUsuario,
  obtenerUsuariosPorRol,
  borrarUsuario,
  buscarUsuarioPorOpciones,
  obtenerSociosMayorSuscripcion,
  obtenerSociosMasCompradores
}
