'use strict'

var express =  require('express');
var subsidiaryController = require('../controllers/subsidiary.controller');
var mAudth = require('../middlewares/authenticated');

var api =  express.Router();
api.post('/saveSubsidiary',mAudth.ensureAuth, subsidiaryController.saveSubsidiary);
api.put('/updateSub/:id',mAudth.ensureAuth, subsidiaryController.updateSubsidiary);
api.delete('/deleteSub/:id',mAudth.ensureAuth, subsidiaryController.removeSubsidiary);

api.put('/asignProduct/:id',mAudth.ensureAuth, subsidiaryController.asignProduct);
api.get('/listSubs',mAudth.ensureAuth, subsidiaryController.listSubs);
api.post('/searchSub/:id', subsidiaryController.searchSub);

module.exports = api;