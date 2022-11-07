const msg = {
    isAlphanumeric: {
      args: /^[a-zA-Z\d\-_./\séáíóúñ+:]+$/,
      msg: 'solo se permite valores alphanumericos'
    },
    notNull: {
      msg: 'este campo es requerido'
    },
    password: {
      args: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/,
      msg: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un caracter especial'
    },
    isEmail: {
      msg: 'el email no es valido'
    },
    isNumeric: {
      msg: 'solo se permite valores numericos'
    },
    isState: {
      args: /^[0-1]$/,
      msg: 'solo se permite valores entre 0 y 1'
    },
    isPhone: {
      args: /^[0-9]{8}$/,
      msg: 'el numero de celular debe tener 8 digitos'
    },
    isFloat: {
      msg: 'solo se permite valores numericos'
    },
    isDate: {
      msg: 'la fecha no es valida'
    },
    positiveNumber: {
      args: 1,
      msg: 'el valor minimo es 1'
    },
    msgIsGreaterThan:
      'el precio de venta no puede ser menor que el precio de compra'
  }
  
  module.exports = msg
  