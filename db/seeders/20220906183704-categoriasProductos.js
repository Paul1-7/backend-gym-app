'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categorias_Productos',
      [
        {
          id: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          nombre: 'Ropa y calzado deportivo',
          estado: 1
        },
        {
          id: '65ac9539-c1d3-45c9-bc37-6b618dba754f',
          nombre: 'Suplementos nutricionales',
          estado: 1
        },
        {
          id: '46e9bf99-93b6-4a15-a481-bc902b1e2276',
          nombre: 'Accesorios de entrenamiento',
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
