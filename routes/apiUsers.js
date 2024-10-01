const express = require('express');
const router = express.Router();
const apiUsersControllers = require('../apis/apiUsersControllers');

// Ruta para obtener la lista de usuarios
router.get('/', apiUsersControllers.list);

// Ruta para obtener el detalle de un usuario
router.get('/:id', apiUsersControllers.detail);

module.exports = router;