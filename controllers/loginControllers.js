let db = require('../database/models');
const bcrypt = require('bcryptjs');  
const { validationResult } = require('express-validator');

let loginControllers = {

    login: (req, res) => {
        res.render('login');
    },

    send: async (req, res) => {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('login', { errors: errors.array() });
            }  
            try {
                const { email, password } = req.body;
                // Buscar el usuario en la base de datos por su email
                const user = await db.Usuario.findOne({
                    where: { email }
            });
                if (!user) {
                    return res.status(401).send('Usuario no encontrado');
                }
                // Verificar la contraseña usando bcrypt
                const isMatch = await bcrypt.compare(password, user.password);    
                if (!isMatch) {
                    return res.status(401).send('Contraseña incorrecta');
                }
                // Guardar el usuario en la sesión
                req.session.user = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    category: user.category,
                    image: user.image
                };
                res.redirect('/login/profile'); // Redirigir al usuario a su dashboard o página principal después de loguearse
        }   catch (error) {
                console.error('Error durante el proceso de login:', error);
                res.status(500).send('Hubo un problema durante el proceso de login');
        }
    },

    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send('Hubo un problema al cerrar sesión');
            }
            res.redirect('/login'); // Redirigir al formulario de login
        });
    }
}

module.exports = loginControllers;