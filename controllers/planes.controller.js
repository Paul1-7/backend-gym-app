const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/planes.service.js')

const msg = {
  notFound: 'Plan no encontrado',
  deleteSuccess: 'Plan eliminado',
  addSuccess: 'Plan agregado correctamente',
  modifySuccess: 'Plan modificado correctamente'
}

const ListarPlanes = async (req, res, next) => {
  try {
    const { query } = req
    const planes = await services.ListarPlanes(query)
    res.json(planes)
  } catch (error) {
    next(error)
  }
}

const BuscarPlan = async (req, res, next) => {
  try {
    const { id } = req.params
    const plan = await services.BuscarPlan(id)

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(plan)
  } catch (error) {
    next(error)
  }
}

const AgregarPlan = async (req, res, next) => {
  try {
    const { body } = req
    const { esRecurrente, fechaVencimiento } = body
    await services.AgregarPlan({
      ...body,
      fechaVencimiento: Number(esRecurrente) === 1 ? null : fechaVencimiento
    })
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarPlan = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const { esRecurrente, fechaVencimiento } = body

    const plan = await services.ModificarPlan(id, {
      ...body,
      fechaVencimiento: Number(esRecurrente) === 1 ? null : fechaVencimiento
    })

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const EliminarPlan = async (req, res, next) => {
  try {
    const { id } = req.params
    const existePlan = await services.BuscarPlan(id)
    if (!existePlan) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const planBorrado = await services.EliminarPlan(id)

    if (planBorrado instanceof Error)
      return ERROR_RESPONSE.notAcceptable(planBorrado.message, res)

    res.json({ message: msg.deleteSuccess, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarPlanes,
  BuscarPlan,
  AgregarPlan,
  ModificarPlan,
  EliminarPlan
}
