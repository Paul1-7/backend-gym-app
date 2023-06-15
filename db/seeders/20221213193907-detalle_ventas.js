'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert(
        'Detalle_Ventas',
        [
          {
            id: '9df017f9-76b4-45a0-bc28-1021d909ab14',
            id_venta: '995e7fe8-f14c-42fa-a7a9-acd4a46c3969',
            id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
            cantidad: 3,
            precio_adquirido: 48
          },
          {
            id: 'b46ccc07-a0c5-41fb-a39f-200f093b5f48',
            id_venta: '033e9c8e-a850-4efd-ba9b-1022f16fa4bf',
            id_prod: '14f23bde-837c-4f51-bb6a-2ddce96f4728',
            cantidad: 1,
            precio_adquirido: 193.6
          },
          {
            id: 'd883e243-e9c5-4f9a-ad38-1b8ca86a876a',
            id_venta: '033e9c8e-a850-4efd-ba9b-1022f16fa4bf',
            id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
            cantidad: 3,
            precio_adquirido:48
          }
        ],
        {}
      )
     
  },
  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Detalle_Ventas', null, {});
     
  }
};
