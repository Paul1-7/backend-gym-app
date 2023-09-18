'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categorias',
      [
        {
          id: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          nombre: 'Ropa y calzado deportivo',
          tipo: 'Producto',
          estado: 1
        },
        {
          id: '65ac9539-c1d3-45c9-bc37-6b618dba754f',
          nombre: 'Suplementos nutricionales',
          tipo: 'Producto',
          estado: 1
        },
        {
          id: '46e9bf99-93b6-4a15-a481-bc902b1e2276',
          nombre: 'Accesorios de entrenamiento',
          tipo: 'Producto',
          estado: 1
        },
        {
          id: 'e271c58f-32df-48c0-b35d-0648346df03d',
          nombre: 'Entrenamiento de resistencia',
          tipo: 'Disciplina',
          estado: 1
        },
        {
          id: 'a8c65ea2-6bad-43e3-ac2e-a257eb34e439',
          nombre: 'Artes marciales',
          tipo: 'Disciplina',
          estado: 1
        },
        {
          id: '95e1bfc4-9b8e-4731-af78-5b1f9c4eda4d',
          nombre: 'Musculación',
          tipo: 'Disciplina',
          estado: 1
        },
        {
          id: '3f6b6557-7f21-491e-967b-cb0baefd8645',
          nombre: 'Clases grupales',
          tipo: 'Disciplina',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {})
  }
}
