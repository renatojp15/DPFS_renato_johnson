var express = require('express');
var router = express.Router();
let productos = require('../data/products.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/productList', (req, res) => {
  res.render('productList', { productos: productos.products });
});
router.get('/productList/productCarga', (req, res) => {
  res.render('productCarga');
});
router.get('/productList/:id', (req, res) => {
  let productos = require('../data/products.json').products;
  const productId = req.params.id;
  const producto = productos.find(p => p.id == productId);

  if(producto){
      res.render('productDetail', { producto: producto });
  }else{
      res.send('Producto no encontrado');
  }
});
router.get('/productList/:id/productEdition', (req, res) => {
  res.render('productEdition');
});

module.exports = router;