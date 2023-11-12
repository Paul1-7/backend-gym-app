'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles_Submenus',
      [
        {
          id: '02a49dca-584d-4b2b-91e0-06989520e32b',
          id_submenu: 'b0183f55-e0d5-4d94-9e86-27c9984836e3',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'b8ce8635-0ae6-467a-ab88-415e0c9f884b',
          id_submenu: 'd55c5f30-b163-48f3-8ad0-5c9feb9c6781',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '054981aa-a7dd-4e9a-bf2b-e1a27f0399ac',
          id_submenu: '0ab3b02f-5df3-45a7-b15c-e017a13f9f18',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'd0546aba-da0e-40b6-8e37-de2de59de1b0',
          id_submenu: '9b4dd333-c467-4709-92ea-79fb9cc70ed2',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'fc7fcebe-045c-4231-93d6-b2d0f7fa42c8',
          id_submenu: '4f07ed03-9870-47b4-9c1d-edc2aa856f8d',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '72cb118e-83fa-4956-a0f1-87b4e57b63da',
          id_submenu: '27b886c8-ea95-4382-8367-a9952a9e8d37',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '922206d1-160e-424d-bc31-1c38e6b2a0b5',
          id_submenu: '0e536de6-674f-4889-a274-931959707283',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '2df388a8-acd1-4994-b979-2237af785df5',
          id_submenu: 'cb4dc9e2-386a-446a-8a3d-f798a4004b2b',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'c3a86f74-7190-4318-a17d-fb410804e09b',
          id_submenu: '85e02234-f79e-45ae-afaf-7d881d96ae9c',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'd8b459ed-f5ba-4ce1-94ae-4d2801a604a3',
          id_submenu: '522668fe-11f5-4938-b687-0cd4625d6dc5',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '77b2dea3-9790-498e-a25f-ddcc3bb12e25',
          id_submenu: '665925ca-ad74-4013-81da-8f4ee66957c7',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '4d1170e3-3cf2-4ff6-96f2-765d3afe4a6b',
          id_submenu: 'c2f9c039-c581-4cd5-9805-6369b6869b2d',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'd8d27ac2-8c0c-495f-99e2-2a7ea5ba7f3f',
          id_submenu: 'ba3813ae-27cb-4ab5-8790-ce6d3e0d7061',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '38de3bdc-af4a-4d92-a2b9-8ddfdd0ce718',
          id_submenu: 'd15f23e2-fc52-4f4c-a303-ecaef763e7b7',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '6dbacac9-4865-458d-b2ee-ea7c48286232',
          id_submenu: '05aa8c24-e89f-4138-a740-27f590817666',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '9565df5a-20c7-421d-ade7-a309de6dabc5',
          id_submenu: '762960b5-fbdb-4d1f-904f-ae2aa35202ee',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '2309301b-fe3d-483f-a94e-3f97c6082a4c',
          id_submenu: '09b42626-3277-4fe1-8bd7-4ed11047761f',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '61509186-9d31-455e-96a0-d9264eabce7a',
          id_submenu: '419cd7cb-2a3b-4020-806e-b4c2fb83b027',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '129dfa74-ba6e-4698-9924-f5721862b505',
          id_submenu: '9cfa03b2-a398-4540-b5f3-380520d0c7e5',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '02d78ef8-8b31-4064-a9b7-addde2c323c1',
          id_submenu: 'b059f50e-d336-4952-8515-527845bd0ab5',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '808eef92-63ed-4fe3-83cc-015844d8994f',
          id_submenu: 'e129be57-ef7c-4630-af72-01cad6a5f0b8',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '29a6205a-8ccd-4ac2-a3f9-bfcefd63e24c',
          id_submenu: 'b5b78fd2-f388-477a-87c5-b5547c94c812',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'dfc03798-27f8-4ef2-b69b-762ce61509f8',
          id_submenu: '892f7df7-f916-4202-b61b-eb4db144a8d2',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '211fc190-0c36-4d10-8d8b-40d4ea3d6f50',
          id_submenu: '5c81e1f2-b1b0-4887-93fe-c642de6ee069',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'a6252165-6edf-4886-b0d0-d0acd52a1dbe',
          id_submenu: '4d68ee0b-e223-4e0a-8806-b950b587a4e3',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'ec17e016-6fec-4734-aa8f-e6bf308f63cf',
          id_submenu: '6f05d779-dc76-4570-b0ea-c8e56aa2fa26',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '82a4f365-68cf-4994-a7b7-7d11a22aace9',
          id_submenu: '0766ad77-17e9-4794-a427-d267452b3b0b',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'c37a13a6-d1f7-486f-af87-ca716f3c9cd2',
          id_submenu: '6ed66471-c291-4b0d-9f37-c0452bc12c45',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '40adacf8-6689-4b36-83a7-a3eabb20b020',
          id_submenu: 'faf0efd2-f486-4e70-9192-77de45b3b9f6',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '87b6cbc2-8eb9-46c3-967d-bf2af0f03aae',
          id_submenu: '7afeb583-9bdf-4564-845f-8a7a220889b3',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'ecc8f92e-a4bf-4130-94a0-b8e02d6f3bec',
          id_submenu: '232ef98a-531e-4b69-990f-b42178edf17d',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'ba0c69ec-24ee-4dec-a6fc-92050c1981b4',
          id_submenu: '1331b732-1b67-43ae-9383-2b6c997f5174',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'd5426952-dc52-4368-8b42-6cf8240e84b0',
          id_submenu: 'bb21d8c9-1cc6-4d65-ab6a-e4471534515a',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'e490d866-413b-4d6c-9ff6-630e0f2fb24d',
          id_submenu: 'a3c6bca6-49aa-4dd4-896a-0ea67f51f32f',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '4683e974-7f6b-456b-a4f0-eb51e7492229',
          id_submenu: '5dbd1d43-6011-4505-a65a-e882a68a4a2e',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '9d6f5aa0-66e3-4e50-bbb0-c6bd287210ff',
          id_submenu: 'd7406b39-e62f-4ece-a4af-7fa4083da33b',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '2085c573-063e-440d-b293-9f18c0b3b69a',
          id_submenu: '2d74ace4-4f2b-4f3f-b311-0f597471a16c',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'a4f67d4b-4a1c-4bce-9f25-1d27a981e48b',
          id_submenu: '06db4511-13b3-4e52-9bef-d85cf80b2941',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'a92bcc47-5b6c-4e3b-a804-1eef4192a04d',
          id_submenu: '52aa646d-4426-4b1d-aded-2549a40f2595',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '29c51217-884d-4d77-be1f-cd339dafc8eb',
          id_submenu: '4135b3f7-74b8-4098-a8ea-7232c999b77e',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '45f8c67b-5f69-4075-b448-797a23b3e2d1',
          id_submenu: '26ec7633-9d5b-4b73-be36-2c9dd338a3a3',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'a94f6411-2ba3-4a6f-acb8-0b4303331967',
          id_submenu: 'cea5e0a2-441e-441f-bf37-cd1ee3e48121',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'e822ba6a-b9d0-41d7-8d33-4a3ca368d697',
          id_submenu: '94cd5f95-83c7-4010-9fd6-eae1d1606b96',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '0ee5d26b-d99a-4cbb-8c76-1b6a1047737a',
          id_submenu: '8423eac3-ad2b-4237-ae54-3b9b815b5a97',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'f08f77c5-b503-4ac1-a199-1e8cc6dd8ee4',
          id_submenu: '967931e6-e2b9-496d-aed1-464dc8aa0372',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'c1c929d7-057b-4d5b-9c58-6c4d5a089cb5',
          id_submenu: '7a978269-2ae8-4c86-a6bc-7d66a2a19c7e',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'ef770938-d1f3-41fc-a5ea-10c352c722be',
          id_submenu: '69602d2f-c6fd-4232-a9aa-3df85d375a2d',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'ab40d2d9-2ac7-4d75-a083-c95c3b5789d2',
          id_submenu: '1dcaea2d-4e72-498b-bf08-cd48df0c2f2d',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'b502feec-204b-41eb-8058-ab4ad9e8827a',
          id_submenu: '930309e3-8058-4479-9925-56b9ebe7d367',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '31462278-efee-4c52-be67-68839fcdca78',
          id_submenu: 'e68813c2-10ce-49c5-ae46-bacd92b93bb4',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'd7531174-d904-4e7e-81c9-baec46bd8466',
          id_submenu: '2d74ace4-4f2b-4f3f-b311-0f597471a16c',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'f65ba8f9-f541-4c37-9a30-cf8e863d21ac',
          id_submenu: 'f65ba8f9-f541-4c37-9a30-cf8e863d21ac',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'd2a98499-363d-4d13-a414-481038ca0994',
          id_submenu: 'f2aa19df-b7ae-479d-a40c-96346b23e98f',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'b2e52e72-dff8-4e90-ad25-ba7cfbdc8574',
          id_submenu: '5b2101cb-9a6a-4bc0-a2ed-18e9552dc6f5',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'a1d19f00-d0d5-4898-8fa4-5af090a61347',
          id_submenu: 'd9511710-9c1c-40bc-a8f6-6883d09599d6',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '46fd47be-c6f0-48ec-a53b-46bd0f76fa78',
          id_submenu: '94b0c58f-fda6-42ed-8176-7118c8fa8a6d',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '27111cdd-edc5-45ed-a48b-5485baef6e12',
          id_submenu: '87ceee1c-e196-4527-a0b9-832e59ff0a0d',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'c9e820ee-8a9d-4424-8894-53b749678150',
          id_submenu: '9808a4ea-e194-4396-8636-cf3e44aa858d',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'd2661dc4-d700-47a6-ad41-98584a8bc7c6',
          id_submenu: 'c7982188-5335-4aa2-a679-56de2e7403b6',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'b20b4025-53fe-48e5-9461-546e218d5b10',
          id_submenu: '81318c5a-2d92-4b1d-958e-1518f19c37e5',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '849a7c7e-7ff1-4e76-92f3-3fda664bbf2f',
          id_submenu: '75f510d5-86ec-4e76-8c73-c495b9242509',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: 'e2fb4f8a-0db7-4118-bee4-aadb8abd5cfd',
          id_submenu: '4421ac2c-61ac-4e88-a5c8-520ca035925c',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        }, // entrenador
        {
          id: 'ac1f4085-45bc-4944-ab66-aa38b8e0740c',
          id_submenu: '2d74ace4-4f2b-4f3f-b311-0f597471a16c',
          id_rol: '12322c7b-dc62-400f-83e2-3b308d7bace8'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles_Submenus', null, {})
  }
}
