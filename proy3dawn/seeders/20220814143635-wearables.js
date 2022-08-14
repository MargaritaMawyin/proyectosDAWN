'use strict';
var marca = ['IPhone', 'Samsung', 'IPhone', 'Xiaomi', 'Xioami', 'Samsung', 'Huawei', 'Huawei', 'Iphone','IPhone'];
var modelo = ['IPhone 11', 'Samsung Galaxy 8', 'IPhone 11 Pro', 'Xiaomi RedMi', 'Xioami RedMi 2', 'A53', 'Mate 20 lite', 'Mate 30 Pro', 'Iphone 13','IPhone 13 Plus'];

module.exports = {
  
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert('Wearable', [{
        idW: i,
        idD: null,
        nombre: 'Wearable ' + i,
        marca: marca[i],
        modelo: modelo[i],
        precio: Math.floor(Math.random() * 101),
        descripcion: "Descripcion del wearable",
        touch: true,
        enlazado:false,
      }], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Wearable', null, {});
  }
};
