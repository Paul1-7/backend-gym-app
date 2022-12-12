const { Op, QueryTypes } = require('sequelize')
const sequelize = require('../libs/sequelize.js')
const { models } = require('../libs/sequelize.js')

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
    `select count(u.id) as "numSuscrip",u.id, u.nombre, u.apellido_p as "apellidoP", u.apellido_m as "apellidoM", u.ci, p.nombre as "nombrePlan" from "Usuarios" as u, "Planes" as p, "Suscripciones" as s where s.id_plan= p.id and s.id_socio= u.id ${
      existParams
        ? `and s.fecha_inicio between '${fechaInicio}' and '${fechaFin}'`
        : ''
    } group by u.id,  u.nombre, u.apellido_p, u.apellido_m, u.ci, p.nombre order by u.apellido_p  asc `,
    { type: QueryTypes.SELECT }
  )
}

async function ListarSuscripciones() {
  return await models.Suscripciones.findAll({ include: ['socio', 'plan'] })
}

async function BuscarSuscripcion(id) {
  return await models.Suscripciones.findByPk(id)
}

async function AgregarSuscripcion(suscripcion) {
  return await models.Suscripciones.create(suscripcion)
}

async function ModificarSuscripcion(id, cambio) {
  const salon = await models.Suscripciones.findByPk(id)
  return await salon?.update(cambio)
}

async function EliminarSuscripcion(id) {
  const salon = await models.Suscripciones.findByPk(id)
  return await salon?.destroy()
}

module.exports = {
  ListarSuscripciones,
  BuscarSuscripcion,
  AgregarSuscripcion,
  ModificarSuscripcion,
  EliminarSuscripcion,
  SuscripcionesEntreFechas,
  SociosPorRenovacionSuscripciones
}
