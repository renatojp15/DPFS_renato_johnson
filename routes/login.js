var express = require('express');
var router = express.Router();
let isAuthenticated = require('../middlewares/isAuthenticated');
let isGuest = require('../middlewares/isGuest');
let {validateLogin} = require('../middlewares/validateLogin');
let loginControllers = require('../controllers/loginControllers');

router.get('/', loginControllers.login);
router.post('/', validateLogin, loginControllers.send);
router.get('/logout', loginControllers.logout);

// router.post('/', (req, res) => {
//     const bcrypt = require('bcryptjs');
//     const path = require('path');
//     const fs = require('fs');
//     const { email, password } = req.body;
//     const filePath = path.join(__dirname, '../data/users.json');

//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         if (err) {
//             return res.status(500).send('Error leyendo el archivo JSON');
//         }

//         let jsonData;
//         try {
//             jsonData = JSON.parse(data);

//             // Verifica que jsonData tenga la propiedad users y sea un array
//             if (jsonData && Array.isArray(jsonData.users)) {
//                 const user = jsonData.users.find(u => u.email === email);

//                 if (!user) {
//                     return res.render('login', { error: 'Usuario no encontrado' });
//                 }

//                 // Comparar la contraseña
//                 bcrypt.compare(password, user.password, (err, isMatch) => {
//                     if (err) {
//                         return res.status(500).send('Error al comparar contraseñas');
//                     }

//                     if (isMatch) {
//                         req.session.user = user; // Guardar usuario en la sesión
//                         res.redirect('/login/profile'); // Redirigir a la página de perfil o home
//                     } else {
//                         res.render('login', { error: 'Contraseña incorrecta' });
//                     }
//                 });
//             } else {
//                 return res.status(500).send('El formato del archivo JSON es incorrecto');
//             }
//         } catch (parseError) {
//             return res.status(500).send('Error al parsear el archivo JSON');
//         }
//     });
// });

// router.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).send('Error al cerrar la sesión');
//         }
//         res.redirect('/login');
//     });
// });

router.get('/', isGuest, (req, res) => res.render('login'));
router.get('/profile', isAuthenticated, (req, res) => res.render('profile', { user: req.session.user }));
router.get('/dashboard', isAuthenticated, (req, res) => res.render('dashboard'));

module.exports = router;