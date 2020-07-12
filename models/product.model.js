'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    Code:String,
    name:String,
    brand:String,
    description:String
});

module.exports = mongoose.model('product', productSchema);
