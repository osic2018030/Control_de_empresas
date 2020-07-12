'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var employeeSchema = Schema({
        CP: String,
        name:String,
        lastname:String,
        age: Number,
        job: String,
        department:String,
        phone:Number,
        email:String
}); 
    

module.exports = mongoose.model('employee', employeeSchema);
