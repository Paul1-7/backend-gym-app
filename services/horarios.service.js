const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const { add } = require('date-fns')
const ROLES = require('../config/roles.js')

async function agregarHorario(data, options = {}) {
  return await models.Horarios.create(data, options)
}

async function ListarHorarios(query = '') {
  return await models.Horarios.findAll({
    include: ['salon', 'disciplina', 'entrenador'],
    where: {
      estado: 1,
      ...query
    }
  })
}

async function obtenerHorariosEntrenadores() {
  return await models.Horarios.findAll({
    attributes: {
      exclude: ['idEntrenador', 'idDisciplina', 'idSalon']
    },
    include: [
      {
        model: models.Salones,
        as: 'salon',
        attributes: ['id', 'nombre', 'capacidad']
      },
      {
        model: models.Usuarios,
        as: 'entrenador',
        attributes: ['id', 'nombre', 'apellidoP', 'apellidoM'],
        include: [
          {
            model: models.Roles,
            as: 'roles',
            attributes: {
              exclude: ['estado']
            },
            through: {
              attributes: []
            },
            where: {
              nombre: ROLES.ENTRENADOR
            }
          }
        ]
      },
      {
        model: models.Disciplinas,
        as: 'disciplina',
        attributes: ['id', 'nombre']
      }
    ],
    where: {
      estado: 1
    }
  })
}

async function verificarDisponibilidad(horarioEntrada, horarioSalida) {
  const registrosIntersectados = await models.Horarios.findAll({
    where: {
      [Op.or]: [
        {
          horarioEntrada: {
            [Op.lt]: horarioSalida
          },
          horarioSalida: {
            [Op.gt]: horarioEntrada
          }
        }
      ]
    }
  })

  return registrosIntersectados.map((item) => item.toJSON())
}

async function verificarDisponibilidadMedianteHora(
  horaEntrada,
  horaSalida,
  dia
) {
  const registrosIntersectados = await models.Horarios.findAll({
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
    },
    dia
  })

  return registrosIntersectados.map((item) => item.toJSON())
}

async function eliminarHorarios(id) {
  const schedule = await models.Horarios.findByPk(id)
  return schedule.update({ estado: 0 })
}

async function buscarHorarioPoUsuario(id) {
  return await models.Horarios.findAll({
    where: {
      idUsuario: id
    }
  })
}

async function buscarHorarioPorId(id) {
  const result = await models.Horarios.findOne({
    where: {
      id
    }
  })

  return result.toJSON()
}

async function modificarHorarios(id, data) {
  const schedule = await models.Horarios.findByPk(id)
  return schedule.update(data)
}

module.exports = {
  agregarHorario,
  buscarHorario: buscarHorarioPoUsuario,
  eliminarHorarios,
  modificarHorarios,
  ListarHorarios,
  verificarDisponibilidad,
  obtenerHorariosEntrenadores,
  verificarDisponibilidadMedianteHora,
  buscarHorarioPorId
}
