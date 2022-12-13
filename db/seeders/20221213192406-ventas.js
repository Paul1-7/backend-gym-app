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
          total: '337.6'
        },
        {
          id: '995e7fe8-f14c-42fa-a7a9-acd4a46c3969',
          fecha: '2022-12-10 14:08:38.784-04',
          id_socio: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          id_vendedor: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          total: '337.6'
        },
        {
          id: 'a5c3c0c5-2a9b-406f-a800-41013145263b',
          fecha: '2022-12-22 14:08:56.497-04',
          id_socio: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          id_vendedor: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          total: 918.4
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ventas', null, {})
  }
}
