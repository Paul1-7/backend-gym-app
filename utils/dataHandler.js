const { SOCIO, RECEPCIONISTA, ENTRENADOR } = require('../config/roles')

const agregarRolSocio = (allRoles, rolesUser) => {
  const rolSocio = allRoles
  .filter((role) => role.nombre === SOCIO)
  .map(({ id }) => (id))

  const existeRol =
  rolesUser?.find((idRol) => idRol === rolSocio[0].idRol)
  
  return existeRol ? rolesUser : [...rolesUser, ...rolSocio]
}

const agregarRolRecepcionista = (allRoles, rolesUser) => {
  const rolEntrenador = allRoles.find(({ nombre }) => nombre === ENTRENADOR)

  const rolRecepcionista = allRoles
    .filter((role) => role.nombre === RECEPCIONISTA)
    .map(({ id }) => (id))

  const existeRolEntrenador = rolesUser.includes(rolEntrenador.id)
  const existeRolRecepcionista = rolesUser.includes(rolRecepcionista.idRol)

  if (existeRolEntrenador && existeRolRecepcionista) return rolesUser
  if (existeRolEntrenador) return [...rolesUser, ...rolRecepcionista]

  return rolesUser
}

const sonDatosValidos = (allData, targets = [], idData, idTarget) => {
  const allIdData = allData.map((value) => value[idData])

  return targets.every((item) => allIdData.includes(item[idTarget]))
}

const agregarDiasAFecha = (dias) => {
  const date = new Date()
  return date.setDate(date.getDate() + dias)
}

const obtenerNuevoStock = (allProduct, bodyProducts) => {
  return bodyProducts.map((product) => {
    const productFound = allProduct
      .find((dataValues) => dataValues.id === product.id)
      .toJSON()
    const { stock } = productFound
    const newStockProd = stock - product.cantidad
    return {
      ...productFound,
      stock: newStockProd
    }
  })
}

module.exports = {
  agregarRolSocio,
  agregarRolRecepcionista,
  sonDatosValidos,
  agregarDiasAFecha,
  obtenerNuevoStock
}
