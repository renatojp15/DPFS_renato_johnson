const { body } = require('express-validator');
const db = require('../database/models');

exports.validateLogin = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un formato de email válido')
        .custom(async (value) => {
            const user = await db.Usuario.findOne({ where: { email: value } });
            if (!user) {
                throw new Error('El email no está registrado');
            }
            return true;
        }),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
];