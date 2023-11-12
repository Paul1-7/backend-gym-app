'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Submenus',
      [
        {
          id: 'b0183f55-e0d5-4d94-9e86-27c9984836e3',
          nombre: 'Listar Socios',
          estado: 1,
          id_menu: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          is_main: true
        },
        {
          id: 'd55c5f30-b163-48f3-8ad0-5c9feb9c6781',
          nombre: 'Agregar Socios',
          estado: 1,
          id_menu: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          is_main: false
        },
        {
          id: '0ab3b02f-5df3-45a7-b15c-e017a13f9f18',
          nombre: 'Modificar Socios',
          estado: 1,
          id_menu: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          is_main: false
        },
        {
          id: '9b4dd333-c467-4709-92ea-79fb9cc70ed2',
          nombre: 'Eliminar Socios',
          estado: 1,
          id_menu: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          is_main: false
        },
        {
          id: '4f07ed03-9870-47b4-9c1d-edc2aa856f8d',
          nombre: 'Listar Empleados',
          estado: 1,
          id_menu: '65ac9539-c1d3-45c9-bc37-6b618dba754f',
          is_main: true
        },
        {
          id: '27b886c8-ea95-4382-8367-a9952a9e8d37',
          nombre: 'Agregar Empleados',
          estado: 1,
          id_menu: '65ac9539-c1d3-45c9-bc37-6b618dba754f',
          is_main: false
        },
        {
          id: '0e536de6-674f-4889-a274-931959707283',
          nombre: 'Modificar Empleados',
          estado: 1,
          id_menu: '65ac9539-c1d3-45c9-bc37-6b618dba754f',
          is_main: false
        },
        {
          id: 'cb4dc9e2-386a-446a-8a3d-f798a4004b2b',
          nombre: 'Eliminar Empleados',
          estado: 1,
          id_menu: '65ac9539-c1d3-45c9-bc37-6b618dba754f',
          is_main: false
        },
        {
          id: '85e02234-f79e-45ae-afaf-7d881d96ae9c',
          nombre: 'Listar Categorias de Productos',
          estado: 1,
          id_menu: '46e9bf99-93b6-4a15-a481-bc902b1e2276',
          is_main: true
        },
        {
          id: '522668fe-11f5-4938-b687-0cd4625d6dc5',
          nombre: 'Agregar Categorias de Productos',
          estado: 1,
          id_menu: '46e9bf99-93b6-4a15-a481-bc902b1e2276',
          is_main: false
        },
        {
          id: '665925ca-ad74-4013-81da-8f4ee66957c7',
          nombre: 'Modificar Categorias de Productos',
          estado: 1,
          id_menu: '46e9bf99-93b6-4a15-a481-bc902b1e2276',
          is_main: false
        },
        {
          id: 'c2f9c039-c581-4cd5-9805-6369b6869b2d',
          nombre: 'Eliminar Categorias de Productos',
          estado: 1,
          id_menu: '46e9bf99-93b6-4a15-a481-bc902b1e2276',
          is_main: false
        },
        {
          id: 'ba3813ae-27cb-4ab5-8790-ce6d3e0d7061',
          nombre: 'Listar Categorias de Disciplina',
          estado: 1,
          id_menu: '6cb2c339-a8e6-4c76-ae4c-8ad42deceb58',
          is_main: true
        },
        {
          id: 'd15f23e2-fc52-4f4c-a303-ecaef763e7b7',
          nombre: 'Agregar Categorias de Disciplina',
          estado: 1,
          id_menu: '6cb2c339-a8e6-4c76-ae4c-8ad42deceb58',
          is_main: false
        },
        {
          id: '05aa8c24-e89f-4138-a740-27f590817666',
          nombre: 'Modificar Categorias de Disciplina',
          estado: 1,
          id_menu: '6cb2c339-a8e6-4c76-ae4c-8ad42deceb58',
          is_main: false
        },
        {
          id: '762960b5-fbdb-4d1f-904f-ae2aa35202ee',
          nombre: 'Eliminar Categorias de Disciplina',
          estado: 1,
          id_menu: '6cb2c339-a8e6-4c76-ae4c-8ad42deceb58',
          is_main: false
        },
        {
          id: '09b42626-3277-4fe1-8bd7-4ed11047761f',
          nombre: 'Listar Categorias de Maquinarias',
          estado: 1,
          id_menu: 'e7f4cca5-8490-4d7e-b5a9-ec46f26e6f13',
          is_main: true
        },
        {
          id: '419cd7cb-2a3b-4020-806e-b4c2fb83b027',
          nombre: 'Agregar Categorias de Maquinarias',
          estado: 1,
          id_menu: 'e7f4cca5-8490-4d7e-b5a9-ec46f26e6f13',
          is_main: false
        },
        {
          id: '9cfa03b2-a398-4540-b5f3-380520d0c7e5',
          nombre: 'Modificar Categorias de Maquinarias',
          estado: 1,
          id_menu: 'e7f4cca5-8490-4d7e-b5a9-ec46f26e6f13',
          is_main: false
        },
        {
          id: 'b059f50e-d336-4952-8515-527845bd0ab5',
          nombre: 'Eliminar Categorias de Maquinarias',
          estado: 1,
          id_menu: 'e7f4cca5-8490-4d7e-b5a9-ec46f26e6f13',
          is_main: false
        },
        {
          id: 'e129be57-ef7c-4630-af72-01cad6a5f0b8',
          nombre: 'Listar Disciplinas',
          estado: 1,
          id_menu: 'f03c0501-11a8-40e9-89b7-a3d4a5db60b7',
          is_main: true
        },
        {
          id: 'b5b78fd2-f388-477a-87c5-b5547c94c812',
          nombre: 'Agregar Disciplinas',
          estado: 1,
          id_menu: 'f03c0501-11a8-40e9-89b7-a3d4a5db60b7',
          is_main: false
        },
        {
          id: '892f7df7-f916-4202-b61b-eb4db144a8d2',
          nombre: 'Modificar Disciplinas',
          estado: 1,
          id_menu: 'f03c0501-11a8-40e9-89b7-a3d4a5db60b7',
          is_main: false
        },
        {
          id: '5c81e1f2-b1b0-4887-93fe-c642de6ee069',
          nombre: 'Eliminar Disciplinas',
          estado: 1,
          id_menu: 'f03c0501-11a8-40e9-89b7-a3d4a5db60b7',
          is_main: false
        },
        {
          id: '4d68ee0b-e223-4e0a-8806-b950b587a4e3',
          nombre: 'Listar Programación de Clases',
          estado: 1,
          id_menu: '6d99bbea-faa6-4b80-9e83-21affcb1637e',
          is_main: true
        },
        {
          id: '6f05d779-dc76-4570-b0ea-c8e56aa2fa26',
          nombre: 'Agregar Programación de Clases',
          estado: 1,
          id_menu: '6d99bbea-faa6-4b80-9e83-21affcb1637e',
          is_main: false
        },
        {
          id: '0766ad77-17e9-4794-a427-d267452b3b0b',
          nombre: 'Modificar Programación de Clases',
          estado: 1,
          id_menu: '6d99bbea-faa6-4b80-9e83-21affcb1637e',
          is_main: false
        },
        {
          id: '94b0c58f-fda6-42ed-8176-7118c8fa8a6d',
          nombre: 'Visualizar Detalle de Programación de Clases',
          estado: 1,
          id_menu: '6d99bbea-faa6-4b80-9e83-21affcb1637e',
          is_main: false
        },
        {
          id: '6ed66471-c291-4b0d-9f37-c0452bc12c45',
          nombre: 'Asignación de Horarios',
          estado: 1,
          id_menu: '6e5e84c8-9e1a-444f-8db4-dd07b994bdea',
          is_main: false
        },
        {
          id: 'faf0efd2-f486-4e70-9192-77de45b3b9f6',
          nombre: 'Listar Salones',
          estado: 1,
          id_menu: '28a48f20-a317-4057-8926-2656f2b2a617',
          is_main: true
        },
        {
          id: '7afeb583-9bdf-4564-845f-8a7a220889b3',
          nombre: 'Agregar Salones',
          estado: 1,
          id_menu: '28a48f20-a317-4057-8926-2656f2b2a617',
          is_main: false
        },
        {
          id: '232ef98a-531e-4b69-990f-b42178edf17d',
          nombre: 'Modificar Salones',
          estado: 1,
          id_menu: '28a48f20-a317-4057-8926-2656f2b2a617',
          is_main: false
        },
        {
          id: '1331b732-1b67-43ae-9383-2b6c997f5174',
          nombre: 'Eliminar Salones',
          estado: 1,
          id_menu: '28a48f20-a317-4057-8926-2656f2b2a617',
          is_main: false
        },
        {
          id: 'f65ba8f9-f541-4c37-9a30-cf8e863d21ac',
          nombre: 'Listar Productos',
          estado: 1,
          id_menu: 'cf98e7b5-0af1-404c-944c-ad315b53a414',
          is_main: true
        },
        {
          id: 'f2aa19df-b7ae-479d-a40c-96346b23e98f',
          nombre: 'Agregar Productos',
          estado: 1,
          id_menu: 'cf98e7b5-0af1-404c-944c-ad315b53a414',
          is_main: false
        },
        {
          id: '5b2101cb-9a6a-4bc0-a2ed-18e9552dc6f5',
          nombre: 'Modificar Productos',
          estado: 1,
          id_menu: 'cf98e7b5-0af1-404c-944c-ad315b53a414',
          is_main: false
        },
        {
          id: 'd9511710-9c1c-40bc-a8f6-6883d09599d6',
          nombre: 'Eliminar Productos',
          estado: 1,
          id_menu: 'cf98e7b5-0af1-404c-944c-ad315b53a414',
          is_main: false
        },
        {
          id: 'bb21d8c9-1cc6-4d65-ab6a-e4471534515a',
          nombre: 'Listar Planes',
          estado: 1,
          id_menu: '9e445ff8-034c-4e87-8341-daf1ea1aa56b',
          is_main: true
        },
        {
          id: 'a3c6bca6-49aa-4dd4-896a-0ea67f51f32f',
          nombre: 'Agregar Planes',
          estado: 1,
          id_menu: '9e445ff8-034c-4e87-8341-daf1ea1aa56b',
          is_main: false
        },
        {
          id: '5dbd1d43-6011-4505-a65a-e882a68a4a2e',
          nombre: 'Modificar Planes',
          estado: 1,
          id_menu: '9e445ff8-034c-4e87-8341-daf1ea1aa56b',
          is_main: false
        },
        {
          id: 'd7406b39-e62f-4ece-a4af-7fa4083da33b',
          nombre: 'Eliminar Planes',
          estado: 1,
          id_menu: '9e445ff8-034c-4e87-8341-daf1ea1aa56b',
          is_main: false
        },
        {
          id: '2d74ace4-4f2b-4f3f-b311-0f597471a16c',
          nombre: 'Listar Suscripciones',
          estado: 1,
          id_menu: '687afffd-41cb-4c1c-afd6-b89b7b3c78c4',
          is_main: true
        },
        {
          id: '06db4511-13b3-4e52-9bef-d85cf80b2941',
          nombre: 'Agregar Suscripciones',
          estado: 1,
          id_menu: '687afffd-41cb-4c1c-afd6-b89b7b3c78c4',
          is_main: false
        },
        {
          id: '52aa646d-4426-4b1d-aded-2549a40f2595',
          nombre: 'Modificar Suscripciones',
          estado: 1,
          id_menu: '687afffd-41cb-4c1c-afd6-b89b7b3c78c4',
          is_main: false
        },
        {
          id: '4135b3f7-74b8-4098-a8ea-7232c999b77e',
          nombre: 'Listar Maquinarias',
          estado: 1,
          id_menu: 'ecd7c180-0471-42f8-913a-8d210b511dc6',
          is_main: true
        },
        {
          id: '26ec7633-9d5b-4b73-be36-2c9dd338a3a3',
          nombre: 'Agregar Maquinarias',
          estado: 1,
          id_menu: 'ecd7c180-0471-42f8-913a-8d210b511dc6',
          is_main: false
        },
        {
          id: 'cea5e0a2-441e-441f-bf37-cd1ee3e48121',
          nombre: 'Modificar Maquinarias',
          estado: 1,
          id_menu: 'ecd7c180-0471-42f8-913a-8d210b511dc6',
          is_main: false
        },
        {
          id: '94cd5f95-83c7-4010-9fd6-eae1d1606b96',
          nombre: 'Eliminar Maquinarias',
          estado: 1,
          id_menu: 'ecd7c180-0471-42f8-913a-8d210b511dc6',
          is_main: false
        },
        {
          id: '8423eac3-ad2b-4237-ae54-3b9b815b5a97',
          nombre: 'Listar Ventas',
          estado: 1,
          id_menu: '150db83b-8fbd-48d6-9a4d-ae8f34e55426',
          is_main: true
        },
        {
          id: '967931e6-e2b9-496d-aed1-464dc8aa0372',
          nombre: 'Agregar Ventas',
          estado: 1,
          id_menu: '150db83b-8fbd-48d6-9a4d-ae8f34e55426',
          is_main: false
        },
        {
          id: '7a978269-2ae8-4c86-a6bc-7d66a2a19c7e',
          nombre: 'Detalle de Ventas',
          estado: 1,
          id_menu: '150db83b-8fbd-48d6-9a4d-ae8f34e55426',
          is_main: false
        },
        {
          id: '69602d2f-c6fd-4232-a9aa-3df85d375a2d',
          nombre: 'Reporte de Ventas',
          estado: 1,
          id_menu: 'c4c40183-6f83-4fcf-a5b0-e708f4e880d9',
          is_main: false
        },
        {
          id: '1dcaea2d-4e72-498b-bf08-cd48df0c2f2d',
          nombre: 'Reporte de Suscripciones',
          estado: 1,
          id_menu: 'c4c40183-6f83-4fcf-a5b0-e708f4e880d9',
          is_main: false
        },
        {
          id: '930309e3-8058-4479-9925-56b9ebe7d367',
          nombre: 'Reportes de Maquinarias',
          estado: 1,
          id_menu: 'c4c40183-6f83-4fcf-a5b0-e708f4e880d9',
          is_main: false
        },
        {
          id: 'e68813c2-10ce-49c5-ae46-bacd92b93bb4',
          nombre: 'Reportes de Productos',
          estado: 1,
          id_menu: 'c4c40183-6f83-4fcf-a5b0-e708f4e880d9',
          is_main: false
        },
        {
          id: '75f510d5-86ec-4e76-8c73-c495b9242509',
          nombre: 'Reportes de Horarios',
          estado: 1,
          id_menu: 'c4c40183-6f83-4fcf-a5b0-e708f4e880d9',
          is_main: false
        },
        {
          id: '87ceee1c-e196-4527-a0b9-832e59ff0a0d',
          nombre: 'Listar Roles',
          estado: 1,
          id_menu: '65b2739a-0037-4bf4-95bf-80385e2e3320',
          is_main: true
        },
        {
          id: '9808a4ea-e194-4396-8636-cf3e44aa858d',
          nombre: 'Agregar Roles',
          estado: 1,
          id_menu: '65b2739a-0037-4bf4-95bf-80385e2e3320',
          is_main: false
        },
        {
          id: 'c7982188-5335-4aa2-a679-56de2e7403b6',
          nombre: 'Modificar Roles',
          estado: 1,
          id_menu: '65b2739a-0037-4bf4-95bf-80385e2e3320',
          is_main: false
        },
        {
          id: '81318c5a-2d92-4b1d-958e-1518f19c37e5',
          nombre: 'Eliminar Roles',
          estado: 1,
          id_menu: '65b2739a-0037-4bf4-95bf-80385e2e3320',
          is_main: false
        },
        {
          id: '4421ac2c-61ac-4e88-a5c8-520ca035925c',
          nombre: 'Detalle de Roles',
          estado: 1,
          id_menu: '65b2739a-0037-4bf4-95bf-80385e2e3320',
          is_main: false
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Submenus', null, {})
  }
}
