const express = require('express');
const router = express.Router();
const apiProductsControllers = require('../apis/apiProductsControllers');

router.get('/', apiProductsControllers.list);
router.get('/:id', apiProductsControllers.detail);

module.exports = router;