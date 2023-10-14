'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Planes',
      [
        {
          id: 'ec074399-ede2-4727-915b-826de09c3c0b',
          nombre: 'Mensual',
          precio: 150.0,
          duracion: 30,
          es_recurrente: 1,
          fecha_vencimiento: null
        },
        {
          id: '94a34d96-b539-4e16-b295-4b6eb0e4a564',
          nombre: 'Trimestral',
          precio: 280.0,
          duracion: 90,
          es_recurrente: 0,
          fecha_vencimiento: '2023-12-11'
        },
        {
          id: '58b5a1cb-8f16-4b34-a26f-e1532fa1a592',
          nombre: 'Semestral',
          precio: 700.0,
          duracion: 180,
          es_recurrente: 0,
          fecha_vencimiento: '2023-12-11'
        },
        {
          id: '954b413e-415b-4f68-8619-8911ec096180',
          nombre: 'Anual',
          precio: 1500.0,
          duracion: 365,
          es_recurrente: 0,
          fecha_vencimiento: '2023-12-11'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Planes', null, {})
  }
}
