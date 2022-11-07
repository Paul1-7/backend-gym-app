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
          fecha_vencimiento: '2021-10-17'
        },
        {
          id: '14f23bde-837c-4f51-bb6a-2ddce96f4728',
          nombre: 'Unbranded Granite Soap',
          precio_compra: 57,
          precio_venta: 193.6,
          stock: 32,
          fecha_vencimiento: '2022-08-02'
        },
        {
          id: 'fa4eebc4-b6fc-4028-a027-0e7a5477372e',
          nombre: 'Tasty Cotton Pizza',
          precio_compra: 33.4,
          precio_venta: 92.8,
          stock: 5,
          fecha_vencimiento: '2021-08-31'
        },
        {
          id: 'ea6f9e29-3715-434a-93bd-76d9e578c156',
          nombre: 'Practical Steel Chair',
          precio_compra: 149.7,
          precio_venta: 29.6,
          stock: 12,
          fecha_vencimiento: '2021-11-22'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productos', null, {})
  }
}
