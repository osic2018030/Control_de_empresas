'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subsidiarySchema = Schema({
    SC:String,
    address:String,
    CE:String,
    employees: [{
        CP: String,
        name:String,
        lastname:String,
        age: Number,
        job: String,
        department:String,
        phone:Number,
        email:String
    }],
    products:[{
        stock:Number,
        product:{type: Schema.Types.ObjectId, ref: 'product'}
    }]
    
});

module.exports = mongoose.model('subsidiary', subsidiarySchema);