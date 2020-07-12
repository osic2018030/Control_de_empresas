'use strict'
 
var express = require('express');
var enterpriseController =  require('../controllers/enterprise.controller');
var mAudth = require('../middlewares/authenticated')

var api =  express.Router();
api.post('/saveEnterprise', enterpriseController.saveEnterprise);
api.put('/updateEnterprise/:id',mAudth.ensureAuth ,enterpriseController.updateEnterprise);
api.delete('/removeEnterprise/:id',mAudth.ensureAuth, enterpriseController.removeEnterprise);

api.get('/listEnterprise', enterpriseController.listEnterprise);
api.post('/login', enterpriseController.login);

module.exports = api; 