'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Salones',
      [
        {
          id: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          nombre: 'Salon 1',
          capacidad: 25,
          estado: 1,
          planta: 1,
          cod_salon: 'S1-0001'
        },
        {
          id: '65ac9539-c1d3-45c9-bc37-6b618dba754f',
          nombre: 'Salon 2',
          capacidad: 30,
          estado: 1,
          planta: 2,
          cod_salon: 'S2-0001'
        },
        {
          id: 'e271c58f-32df-48c0-b35d-0648346df03d',
          nombre: 'Salon 3',
          capacidad: 40,
          estado: 1,
          planta: 1,
          cod_salon: 'S1-0002'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Salones', null, {})
  }
}
