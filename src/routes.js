const express = require('express');

const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();
const upload = multer(multerConfig);

const ProductController = require('./controllers/ProductController');

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', upload.single('image'), ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

module.exports = routes;