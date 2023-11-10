const { Op, QueryTypes } = require('sequelize')
const sequelize = require('../libs/sequelize.js')
const { models } = require('../libs/sequelize.js')
const { verificarSuscripcionActiva } = require('../utils/dataHandler.js')
const { differenceInDays, add, startOfDay, endOfDay } = require('date-fns')

async function SuscripcionesEntreFechas({ fechaInicio, fechaFin }) {
  return await models.Suscripciones.findAll({
    include: ['socio', 'plan'],
    where: {
      fechaInicio: {
        [Op.between]: [fechaInicio, fechaFin]
      }
    }
  })
}

async function SociosPorRenovacionSuscripciones({ fechaInicio, fechaFin }) {
  const existParams = fechaInicio && fechaFin
  return await sequelize.query(
    `select count(u.id) as "numSuscrip", u.nombre, u.apellido_p as "apellidoP", u.apellido_m as "apellidoM", u.ci,s.fecha_inicio as "fechaInicio", p.nombre as "nombrePlan" from "Usuarios" as u, "Planes" as p, "Suscripciones" as s where s.id_plan= p.id and s.id_socio= u.id ${
      existParams
        ? `and s.fecha_inicio between '${fechaInicio}' and '${fechaFin}'`
        : ''
    } group by  u.nombre, u.apellido_p, u.apellido_m, u.ci,s.fecha_inicio, p.nombre order by u.apellido_p  asc `,
    { type: QueryTypes.SELECT }
  )
}

async function ObtenerSuscripcionesActivas() {
  return await models.Suscripciones.findAll({
    include: ['socio', 'plan'],
    where: {
      fecha_fin: {
        [Op.gte]: sequelize.literal('CURRENT_DATE')
      }
    }
  })
}

async function ObtenerPlanMasSolicitado({
  dateStart: dateStartISO,
  dateEnd: dateEndISO
}) {
  const hasDate = dateStartISO && dateEndISO
  let whereOptions = {}

  if (hasDate) {
    const dateStart = startOfDay(new Date(dateStartISO)).toISOString()
    const dateEnd = endOfDay(new Date(dateEndISO)).toISOString()

    whereOptions = {
      fechaInicio: {
        [Op.between]: [dateStart, dateEnd]
      }
    }
  }

  return await models.Suscripciones.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id_plan')), 'cantidad'],
      [sequelize.col('plan.nombre'), 'nombre']
    ],
    include: [
      {
        model: models.Planes,
        attributes: [],
        as: 'plan'
      }
    ],
    where: whereOptions,
    group: ['plan.nombre'],
    order: [[sequelize.literal('cantidad'), 'DESC']],
    raw: true
  })
}

async function ObtenerPromRenovacionSusc() {
  return await sequelize
    .query(
      'select avg(cont."suma") from(select sum(cantidad) as "suma", u.ci from "Usuarios" as u, "Planes" as p, "Suscripciones" as s  where s.id_plan= p.id and s.id_socio= u.id and p.es_recurrente = 1 group by  u.ci ) as cont',
      {
        type: QueryTypes.SELECT
      }
    )
    .then((data) => data.shift().avg)
}

async function ListarSuscripciones() {
  return await models.Suscripciones.findAll({ include: ['socio', 'plan'] })
}

async function BuscarSuscripcion(id) {
  return await models.Suscripciones.findByPk(id, { include: 'socio' })
}

async function AgregarSuscripcion(suscripcion, options = {}) {
  const { idSocio, fechaFin } = suscripcion
  const ultimaSucripcion = await ObtenerUltimasSucripciones(idSocio)
  const hasSuscription = verificarSuscripcionActiva(ultimaSucripcion?.fechaFin)

  const extraDays = ultimaSucripcion.length
    ? differenceInDays(ultimaSucripcion[0].fechaFin, new Date())
    : 0

  const newSuscription = hasSuscription
    ? {
        ...suscripcion,
        diasExtras: extraDays,
        fechaFin: add(fechaFin, { days: extraDays })
      }
    : suscripcion

  return await models.Suscripciones.create(newSuscription, options)
}

async function ModificarSuscripcion(id, cambio) {
  const salon = await models.Suscripciones.findByPk(id)
  return await salon?.update(cambio)
}

async function ObtenerUltimasSucripciones(idSocio) {
  const suscriptions = await models.Suscripciones.findAll({
    where: {
      idSocio,
      fechaFin: {
        [Op.gte]: new Date().toISOString()
      }
    },
    order: [
      ['fechaFin', 'DESC'],
      ['id', 'DESC']
    ]
  })

  return suscriptions.map((suscription) => suscription.toJSON())
}

module.exports = {
  ListarSuscripciones,
  BuscarSuscripcion,
  AgregarSuscripcion,
  ModificarSuscripcion,
  SuscripcionesEntreFechas,
  SociosPorRenovacionSuscripciones,
  ObtenerPlanMasSolicitado,
  ObtenerSuscripcionesActivas,
  ObtenerPromRenovacionSusc,
  ObtenerUltimasSucripciones
}
