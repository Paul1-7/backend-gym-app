'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Ventas',
      [
        {
          id: '033e9c8e-a850-4efd-ba9b-1022f16fa4bf',
          fecha: '2022-12-13 14:07:59.643-04',
          id_socio: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          id_vendedor: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          total: '337.6',
          cod_venta: 'V-20220527-0001'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ventas', null, {})
  }
}
