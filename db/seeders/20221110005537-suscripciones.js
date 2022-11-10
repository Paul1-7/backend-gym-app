'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Suscripciones',
      [
        {
          id: 'd7cb83f2-1b74-479e-a6e8-1e5e6b853218',
          id_socio: '6efc6605-0364-4980-8428-4d332fd41cae',
          id_plan: '94a34d96-b539-4e16-b295-4b6eb0e4a564',
          fecha_inicio: '2022-11-09',
          fecha_fin: '2023-02-07',
          cantidad: 1,
          monto_cancelado: 280,
          estado: 1
        },
        {
          id: '65e9a724-b8d9-4466-be03-dcdfc233b806',
          id_socio: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          id_plan: 'ec074399-ede2-4727-915b-826de09c3c0b',
          fecha_inicio: '2022-11-09',
          fecha_fin: '2022-12-09',
          cantidad: 1,
          monto_cancelado: 150,
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Suscripciones', null, {})
  }
}
