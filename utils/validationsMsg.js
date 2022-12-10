const msg = {
  isAlphanumeric: {
    args: /^[a-zA-Z\d\-_./\s,éáíóúñ+]+$/,
    msg: 'solo se permite valores alphanumericos'
  },
  notNull: {
    msg: 'este campo es requerido'
  },
  isEmail: {
    args: /^(|[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/,
    msg: 'el email no es valido'
  },
  isNumeric: {
    msg: 'solo se permite valores numericos'
  },
  isState: {
    args: /^[0-5]$/,
    msg: 'el valor ingresado no es correcto'
  },
  isPhone: {
    args: /^[0-9]+$/,
    msg: 'el numero de celular debe tener 8 digitos'
  },
  isFloat: {
    msg: 'solo se permite valores numericos'
  },
  isDate: {
    msg: 'la fecha no es valida'
  },
  minValue: {
    args: 0,
    msg: 'el valor minimo es 0'
  },
  msgIsGreaterThan:
    'el precio de venta no puede ser menor que el precio de compra',
  msgPositiveNumber: 'el valor ingresado tiene que ser positivo',
  msgUniqueValue: (value) =>
    `el valor ingresado en el campo "${value}" ya existe en el sistema`,
  msgValidationError: 'ERROR DE VALIDACIÓN:',
  msgDatabaseError: 'no se puede realizar la accion solicitada',
  msgErrorForeignKey:
    'Otras partes del sistema estan haciendo uso del registró seleccionado'
}

module.exports = msg
