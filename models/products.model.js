'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    stock:Number,
    product:{type: Schema.Types.ObjectId, ref: 'product'}
});

module.exports = mongoose.model('products', productSchema);