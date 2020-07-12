'use strict'

var express =  require('express');
var employeeController = require('../controllers/employee.controller');

var api =  express.Router();

api.put('/:id/saveEmployee', employeeController.saveEmployee);
api.put('/:id/updateEmployee/:ide', employeeController.updateEmployee);
api.put('/:id/removeEmployee/:ide',employeeController.removeEmployee);
api.get('/listEmployees/:id', employeeController.listEmployee);
api.get('/search/:id', employeeController.search);

module.exports = api;