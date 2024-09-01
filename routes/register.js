var express = require('express');
var router = express.Router();
let isGuest = require('../middlewares/isGuest');
const multer = require('multer');
const path = require('path');

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

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', upload.single('image'), (req, res) => {
        const path = require('path');
        const fs = require('fs');
        const bcrypt = require('bcryptjs');
        const saltRounds = 10; // Número de saltos para la encriptación
        const filePath = path.join(__dirname, '../data/users.json');
    
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) return res.status(500).send('Error leyendo el archivo JSON');
    
            let jsonData;
            try {
                jsonData = JSON.parse(data);
            } catch (parseError) {
                return res.status(500).send('Error al parsear el archivo JSON');
            }
    
            bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
                if (err) return res.status(500).send('Error encriptando la contraseña');
    
                const newUser = {
                    id: Date.now(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword,
                    category: req.body.category,
                    image: req.file ? '/images/profiles/' + req.file.filename : ''
                };
    
                jsonData.users.push(newUser);
    
                fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
                    if (writeErr) return res.status(500).send('Error escribiendo en el archivo JSON');
                    res.redirect('/');
                });
            });
        });
    });

//router.get('/user/:id', usersControllers.detail);

// router.put('/user/:id', upload.single('image'), usersControllers.edit);

router.get('/', isGuest, (req, res) => res.render('register'));

module.exports = router;