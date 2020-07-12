'use strict'

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var enterpriseSchema = Schema({
    CE:String,
    name: String,
    description: String,
    address: String,
    phone: Number,
    fax: Number,
    email: String,
    password: String,
    subsidiarys:[{
       type: Schema.Types.ObjectId, ref: 'subsidiary'
        }]
});    

module.exports = mongoose.model('enterprise', enterpriseSchema);


