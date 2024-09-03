var express = require('express');
var router = express.Router();
let isGuest = require('../middlewares/isGuest');
let registerValidator = require('../middlewares/registerValidator');
let registerControllers = require('../controllers/registerControllers');
let bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
router.use(bodyParser.json());

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/profiles')); // Carpeta de destino
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para la imagen
    }
});
const upload = multer({ storage: storage });

router.get('/', registerControllers.create);
router.post('/', upload.single('image'), registerValidator, registerControllers.send);
router.get('/:id', registerControllers.detail);
router.get('/:id/edit', registerControllers.edit);
router.put('/:id', upload.single('image'), registerControllers.modifying);
router.get('/', isGuest, (req, res) => res.render('register'));

module.exports = router;