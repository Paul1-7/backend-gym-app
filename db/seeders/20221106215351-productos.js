'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Productos',
      [
        {
          id: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
          nombre: 'Small Wooden Cheese',
          precio_compra: 34.7,
          precio_venta: 48,
          stock: 3,
          tiene_vencimiento: true,
          fecha_vencimiento: '2021-10-17',
          id_categoria: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7'
        },
        {
          id: '14f23bde-837c-4f51-bb6a-2ddce96f4728',
          nombre: 'Unbranded Granite Soap',
          precio_compra: 57,
          precio_venta: 193.6,
          stock: 32,
          tiene_vencimiento: true,
          fecha_vencimiento: '2022-08-02',
          id_categoria: '65ac9539-c1d3-45c9-bc37-6b618dba754f'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productos', null, {})
  }
}
