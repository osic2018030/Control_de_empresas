'use strict'
var Enterprise = require('../models/enterprise.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt')
//Crud enterprise

function saveEnterprise(req, res){
    var enterprise = new Enterprise();
    var params =  req.body;

    if(params.CE && params.name && params.description && params.address && params.phone && params.fax && params.email && params.password){
        Enterprise.findOne({name: params.name}, (err, enterpriseName)=>{
            if(err){
                res.status(500).send({message: 'Error', err});
            }else if(enterpriseName){
                res.status(200).send({message: 'La empresa ya existe'});
            }else{
                enterprise.CE = params.CE;
                enterprise.name = params.name;
                enterprise.description = params.description;
                enterprise.address = params.address;
                enterprise.phone = params.phone;  
                enterprise.fax = params.fax;
                enterprise.email = params.email;
                bcrypt.hash(params.password, null, null, (err, passwordHash)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor'});
                    }else if(passwordHash){
                        enterprise.password = passwordHash;
                        enterprise.save((err, enterpriseSaved)=>{
                            if(err){
                                res.status(500).send({message:'Error en el servidor'});
                            }else if(enterpriseSaved){
                                res.send({enterprise: enterpriseSaved});
                            }else{
                                res.status(500).send({message: 'Error al guardar la empresa'})
                            }
                        });
                    }else{
                        res.status(418).send({message:'Error en la encryptacion'});
                    }
                });
            }
        });
    }else{
        res.send({message:'Ingrese todos los campos requeridos'});
    }
}

function updateEnterprise(req, res){
    let enterpriseId = req.params.id;
    var update = req.body;

    Enterprise.findByIdAndUpdate(enterpriseId, update, {new: true}, (err, enterpriseUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else if(enterpriseUpdate){
            res.send({enterpriseUpdate: enterpriseUpdate});
        }else{
            res.status(500).send({message: 'No se pudo actualizar el registro'});
        }
    });
}

function removeEnterprise(req, res){
    let enterpriseId = req.params.id;

    Enterprise.findByIdAndRemove(enterpriseId, (err, enterpriseRemove)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else if(enterpriseRemove){
            res.send({message: 'Empresa Eliminada'});
        }else{
            res.status(500).send()

        }
    });

}

function listEnterprise(req, res){
    Enterprise.find({}, (err, EnterpriseL)=>{
        if(err){
            res.status(500).send({message:'error'});
        }else if(EnterpriseL){
            res.status(200).send({message:EnterpriseL});
        }else{
            res.status(500).send({message:'No se'})
        }
    }).populate('subsidiarys');
}

function login(req, res){
    var params = req.body;
    if(params.CE && params.password){
        Enterprise.findOne({CE:params.CE}, (err, check)=>{
            if(err){
                res.status(500).send({message:'Error en le servidor'});
            }else if(check){
                bcrypt.compare(params.password, check.password, (err, passwordOk)=>{
                    if(err){
                        res.status(500).send({message: 'Error en la comparacion de las contraseñas'});
                    }else if(passwordOk){
                        if(params.gettoken = true){
                            res.send({token: jwt.createToken(check)});
                        }else{
                            res.send({message:'Bienvendido', enteprise:check});
                        }
                    }
                })
            }else{
                res.send({message:'Datos incorrectos'});
            }
        });
    }else{
        res.send({message:'Ingrese todos los campos'});
    }
}

module.exports = {
    saveEnterprise,
    updateEnterprise,
    removeEnterprise,
    listEnterprise,
    login
}