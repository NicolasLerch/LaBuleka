let nextProductId = 1;
const product = {
    products : [
        {
            "id": "nextProductId++",
            "nombre": "Manzanas",
            "img": "/images/products/manzana.webp",
            "precio": 1200
        },
        {
            "id": "nextProductId++",
            "nombre": "Zanahorias",
            "img": "/images/products/zanahorias.jpg",
            "precio": 900
        },
        {
            "id": "nextProductId++",
            "nombre": "Tomates",
            "img": "/images/products/tomates.jpg",
            "precio": 1300
        },
        {
            "id": "nextProductId++",
            "nombre": "Lechugas",
            "img": "/images/products/lechuga.webp",
            "precio": 1000
        },
        {
            "id": "nextProductId++",
            "nombre": "Cebollas",
            "img": "cebollas.jpg",
            "precio": 1100
        },
        {
            "id": "nextProductId++",
            "nombre": "Pepinos",
            "img": "pepinos.jpg",
            "precio": 1400
        },
        {
            "id": "nextProductId++",
            "nombre": "Ajos",
            "img": "ajos.jpg",
            "precio": 800
        },
        {
            "id": "nextProductId++",
            "nombre": "Apio",
            "img": "apio.jpg",
            "precio": 950
        },
        {
            "id": "nextProductId++",
            "nombre": "Limones",
            "img": "limones.jpg",
            "precio": 1450
        },
        {
            "id": "nextProductId++",
            "nombre": "Repollo",
            "img": "repollo.jpg",
            "precio": 1200
        }
    ],
    getAll : function () {
        return this.products;
      }
};

module.exports = product;