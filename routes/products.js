var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
const multer = require('multer');
let path = require('path');
const {validateProduct} = require('../middlewares/validateProduct');
let productsControllers = require('../controllers/productsControllers');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// Configuración de multer para manejar archivos de imagen
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// Middleware para parsear el cuerpo de las peticiones como JSON
router.use(bodyParser.json());

router.get('/create', productsControllers.create);
router.post('/', upload.single('image'), validateProduct, productsControllers.send);
router.get('/', productsControllers.list);
router.get('/:id/edit', productsControllers.edition);
router.put('/:id', upload.single('image'), validateProduct, productsControllers.modifying);
router.get('/:id', productsControllers.detail);
router.delete('/:id', productsControllers.delete);

module.exports = router;