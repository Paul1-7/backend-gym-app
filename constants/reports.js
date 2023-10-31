const SALES_REPORT_ORDER_BY = [
  {
    id: '1',
    criteria: ['fecha', 'DESC']
  },
  {
    id: '2',
    criteria: ['total', 'DESC']
  },
  {
    id: '3',
    criteria: ['socio', 'nombre', 'DESC']
  },
  {
    id: '4',
    criteria: ['vendedor', 'nombre', 'DESC']
  }
]

const EQUIPMENTS_REPORT_ORDER_BY = [
  {
    id: '1',
    criteria: ['nombre', 'DESC']
  },
  {
    id: '2',
    criteria: ['marca', 'DESC']
  },
  {
    id: '3',
    criteria: ['modelo', 'DESC']
  },
  {
    id: '4',
    criteria: ['fechaAdquisicion', 'DESC']
  },
  {
    id: '5',
    criteria: ['precio', 'DESC']
  },
  {
    id: '6',
    criteria: ['estado', 'DESC']
  }
]

const PRODUCTS_REPORT_ORDER_BY = [
  {
    id: '1',
    criteria: ['nombre', 'DESC']
  },
  {
    id: '2',
    criteria: ['precioVenta', 'DESC']
  },
  {
    id: '3',
    criteria: ['precioCompra', 'DESC']
  },
  {
    id: '4',
    criteria: ['fechaVencimiento', 'DESC']
  },
  {
    id: '5',
    criteria: ['stock', 'DESC']
  }
]

const EQUIPMENTS_REPORT_CRITERIA = {
  1: {},
  2: { estado: 'operativa' },
  3: { estado: 'en reparación' },
  4: { estado: 'fuera de servicio' }
}
const PRODUCTS_REPORT_CRITERIA = {
  1: {},
  2: { tieneVencimiento: true },
  3: { tieneVencimiento: false }
}

module.exports = {
  SALES_REPORT_ORDER_BY,
  EQUIPMENTS_REPORT_ORDER_BY,
  EQUIPMENTS_REPORT_CRITERIA,
  PRODUCTS_REPORT_CRITERIA,
  PRODUCTS_REPORT_ORDER_BY
}
