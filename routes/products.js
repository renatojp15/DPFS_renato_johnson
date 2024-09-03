var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
const multer = require('multer');
let path = require('path');
let productsControllers = require('../controllers/productsControllers');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// Configuración de multer para manejar archivos de imagen
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// Middleware para parsear el cuerpo de las peticiones como JSON
router.use(bodyParser.json());

router.get('/create', productsControllers.create);
router.post('/', upload.single('image'), productsControllers.send);
router.get('/', productsControllers.list);
router.get('/:id/edit', productsControllers.edition);
router.put('/:id', upload.single('image'), productsControllers.modifying);
router.get('/:id', productsControllers.detail);
router.delete('/:id', productsControllers.delete);

// router.get('/create', (req, res) => {
//     res.render('productCreate');
// });

// router.get('/:id', (req, res) => {
//         let productos = require('../data/products.json').products;
//         const productId = req.params.id;
//         const product = productos.find(p => p.id == productId);
      
//         if(product){
//             res.render('productDetail', { product: product });
//         }else{
//             res.send('Producto no encontrado');
//         }
//     });

// router.post('/', upload.single('image'), (req, res) => {
//         let path = require('path');
//         let fs = require('fs');
//         const filePath = path.join(__dirname, '../data/products.json');
//         // Nuevo producto a agregar
//         const newProduct = {
//             id: Date.now(), // Genera un ID único basado en la fecha actual
//             name: req.body.name,
//             description: req.body.description,
//             image: '/images/' + req.file.filename, // Ruta de la imagen guardada
//             category: req.body.category,
//             colors: req.body.colors.split(',').map(color => color.trim()), // Convierte la cadena de colores en un array
//             price: parseFloat(req.body.price)
//         };

//         fs.readFile(filePath, 'utf-8', (err, data) => {
//             if (err) {
//             return res.status(500).send('Error leyendo el archivo JSON');
//             }

//             let jsonData;
//             try {
//             jsonData = JSON.parse(data);
//             // Verifica que jsonData sea un objeto con un array de productos
//             if (jsonData && Array.isArray(jsonData.products)) {
//                 // Agregar el nuevo producto al array
//                 jsonData.products.push(newProduct);

//                 // Escribir el nuevo contenido en el archivo JSON
//                 fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
//                     if (writeErr) {
//                         return res.status(500).send('Error escribiendo en el archivo JSON');
//                     }
//                     console.log('Producto agregado con éxito');
//                     res.redirect('/products'); // Redirige a la página de productos o a otra página
//                 });
//             } else {
//                 return res.status(500).send('El formato del archivo JSON es incorrecto');
//             }
//         } catch (parseError) {
//             return res.status(500).send('Error al parsear el archivo JSON');
//         }
//     });
//     });

// router.get('/:id/edit', (req, res) => {
//         let path = require('path');
//         let fs = require('fs');
//         const filePath = path.join(__dirname, '../data/products.json');
//         const productId = parseInt(req.params.id, 10);
    
//         fs.readFile(filePath, 'utf-8', (err, data) => {
//             if (err) {
//                 return res.status(500).send('Error leyendo el archivo JSON');
//             }
    
//             let jsonData;
//             try {
//                 jsonData = JSON.parse(data);
    
//                 if (jsonData && Array.isArray(jsonData.products)) {
//                     const product = jsonData.products.find(product => product.id === productId);
    
//                     if (!product) {
//                         return res.status(404).send('Producto no encontrado');
//                     }
    
//                     // Pasar el producto a la vista
//                     res.render('productEdit', { product });
//                 } else {
//                     return res.status(500).send('El formato del archivo JSON es incorrecto');
//                 }
//             } catch (parseError) {
//                 return res.status(500).send('Error al parsear el archivo JSON');
//             }
//         });
//     });

// router.put('/:id', upload.single('image'), (req, res) => {
//         let path = require('path');
//         let fs = require('fs');
//         const filePath = path.join(__dirname, '../data/products.json');
//         const productId = parseInt(req.params.id, 10);
    
//         fs.readFile(filePath, 'utf-8', (err, data) => {
//             if (err) {
//                 return res.status(500).send('Error leyendo el archivo JSON');
//             }
    
//             let jsonData;
//             try {
//                 jsonData = JSON.parse(data);
    
//                 if (jsonData && Array.isArray(jsonData.products)) {
//                     const productIndex = jsonData.products.findIndex(product => product.id === productId);
    
//                     if (productIndex === -1) {
//                         return res.status(404).send('Producto no encontrado');
//                     }
    
//                     // Actualizar el producto con los nuevos datos
//                     const updatedProduct = {
//                         ...jsonData.products[productIndex],
//                         name: req.body.name,
//                         description: req.body.description,
//                         category: req.body.category,
//                         colors: req.body.colors ? req.body.colors.split(',').map(color => color.trim()) : jsonData.products[productIndex].colors,
//                         price: parseFloat(req.body.price)
//                     };
    
//                     // Si se ha subido una nueva imagen, reemplazar la anterior
//                     if (req.file) {
//                         updatedProduct.image = '/images/' + req.file.filename;
//                     }
    
//                     // Guardar el producto actualizado en el array
//                     jsonData.products[productIndex] = updatedProduct;
    
//                     // Escribir los datos actualizados en el archivo JSON
//                     fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
//                         if (writeErr) {
//                             return res.status(500).send('Error escribiendo en el archivo JSON');
//                         }
//                         console.log('Producto actualizado con éxito');
//                         res.redirect('/products'); // Redirigir a la lista de productos o a otra página
//                     });
//                 } else {
//                     return res.status(500).send('El formato del archivo JSON es incorrecto');
//                 }
//             } catch (parseError) {
//                 return res.status(500).send('Error al parsear el archivo JSON');
//             }
//         });
//     });

//     router.delete('/:id', (req, res) => {
//             let path = require('path');
//             let fs = require('fs');
//             const productId = parseInt(req.params.id, 10);
//             const filePath = path.join(__dirname, '../data/products.json');
        
//             // Leer el archivo JSON
//             fs.readFile(filePath, 'utf-8', (err, data) => {
//                 if (err) {
//                     return res.status(500).send('Error leyendo el archivo JSON');
//                 }
        
//                 let jsonData;
//                 try {
//                     jsonData = JSON.parse(data);
        
//                     // Encontrar el índice del producto a eliminar
//                     const productIndex = jsonData.products.findIndex(product => product.id === productId);
        
//                     if (productIndex === -1) {
//                         return res.status(404).send('Producto no encontrado');
//                     }
        
//                     // Eliminar el producto del array
//                     jsonData.products.splice(productIndex, 1);
        
//                     // Guardar el array actualizado en el archivo JSON
//                     fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
//                         if (writeErr) {
//                             return res.status(500).send('Error escribiendo en el archivo JSON');
//                         }
//                         console.log('Producto eliminado con éxito');
//                         res.redirect('/products'); // Redirigir a la lista de productos o a otra página
//                     });
//                 } catch (parseError) {
//                     return res.status(500).send('Error al parsear el archivo JSON');
//                 }
//             });
//         });

module.exports = router;