const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const authAdmin = require('../middlewares/adminAuthMiddleware');

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,  '../../public/images/products'));
    },
    filename: function(req, file, cb) {
        const newFilename = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
        console.log(file);
    }
})

const upload = multer({storage:storage})

// router.use('/productos', productController.getAll);
router.get("/", productController.getAll);
router.get('/create', authAdmin,  productController.create);
router.post('/create', upload.single("product-img"), productController.save);

// vista de lista de productos para admin
router.get('/all', authAdmin, productController.productsList)

// editar producto
router.put('/:id/edit', authAdmin, upload.single("product-img"), productController.edit)

// borrar producto
router.delete('/:id/delete', authAdmin, productController.delete)



module.exports = router;