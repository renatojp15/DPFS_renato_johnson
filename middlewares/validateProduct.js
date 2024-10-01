const { body } = require('express-validator');

exports.validateProduct = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
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