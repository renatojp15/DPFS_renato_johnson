// middlewares/registerValidator.js
const { body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    body('firstName')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastName')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un formato de email válido')
        .custom(async (value) => {
            const user = await db.Usuario.findOne({ where: { email: value } });
            if (user) {
                throw new Error('El email ya está registrado');
            }
            return true;
        }),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/).withMessage('La contraseña debe incluir mayúsculas, minúsculas, un número y un carácter especial'),
    body('image').custom((value, { req }) => {
        if (!req.file) return true; // No es obligatorio subir una imagen
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
        if (!validExtensions.includes(`.${fileExtension}`)) {
            throw new Error('Debe ser un archivo válido (JPG, JPEG, PNG, GIF)');
        }
        return true;
    })
];