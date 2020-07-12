'use strict'
var express = require('express');
var productController = require('../controllers/product.controller');

var api =  express.Router();

api.post('/saveProduct', productController.saveProduct);
api.put('/updateProduct/:id', productController.updateProduct);
api.delete('/deleteProduct/:id', productController.removeProduct);

module.exports = api;