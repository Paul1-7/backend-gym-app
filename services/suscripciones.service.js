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

async function ObtenerSocioMayorSuscripcion() {
  return await sequelize
    .query(
      `select count(u.id) as "numSuscrip", u.nombre, u.apellido_p as "apellidoP", u.apellido_m as "apellidoM", u.ci 
from "Usuarios" as u, "Planes" as p, "Suscripciones" as s where s.id_plan= p.id and s.id_socio= u.id
 group by  u.nombre, u.apellido_p, u.apellido_m, u.ci
 order by "numSuscrip" desc `,
      { type: QueryTypes.SELECT }
    )
    .then((data) => data.shift())
}

async function ObtenerNumSuscripcionesActivas() {
  return await sequelize
    .query(
      `select count(s.id) as "cantidad"
from "Usuarios" as u, "Planes" as p, "Suscripciones" as s 
where s.id_plan= p.id and s.id_socio= u.id and current_date <= s.fecha_fin `,
      { type: QueryTypes.SELECT }
    )
    .then((data) => data.shift().cantidad)
}

async function ObtenerPlanMasSolicitado() {
  return await sequelize
    .query(
      'select  count(s.id_plan) as cantidad, p.nombre  from "Suscripciones" as s, "Planes" as p where s.id_plan= p.id and p.es_expandible= 0 group by p.nombre order by cantidad desc ',
      { type: QueryTypes.SELECT }
    )
    .then((data) => data.shift())
}

async function ObtenerPromRenovacionSusc() {
  return await sequelize
    .query(
      'select avg(cont."suma") from(select sum(cantidad) as "suma", u.ci from "Usuarios" as u, "Planes" as p, "Suscripciones" as s  where s.id_plan= p.id and s.id_socio= u.id and p.es_expandible = 1 group by  u.ci ) as cont',
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
  SociosPorRenovacionSuscripciones,
  ObtenerPlanMasSolicitado,
  ObtenerSocioMayorSuscripcion,
  ObtenerNumSuscripcionesActivas,
  ObtenerPromRenovacionSusc
}
