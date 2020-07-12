'use strict'

var Subsidiary = require('../models/subsidiary.model');
var Product = require('../models/products.model');

function saveSubsidiary(req, res){
    let subParams =  req.body;
    let subsidiarys = new Subsidiary();

    if(subParams.CE && subParams.SC && subParams.address){
            Subsidiary.findOne({SC:subParams.SC}, (err, subFind)=>{
                if(err){
                    res.status(500).send({mesage:'Error en el servidor'});
                }else if(subFind){
                    res.send({mesage:'La sucursal ya existe'});
                }else{
                    subsidiarys.CE = subParams.CE;
                    subsidiarys.SC = subParams.SC;
                    subsidiarys.address = subParams.address;
    
                    subsidiarys.save((err, subSaved)=>{
                        if(err){
                            res.status(500).send({mesage:'Error en el servidor'});
                        }else if(subSaved){
                            res.send({subSaved: subSaved});
                        }else{
                            res.status(418).send({mesage:'no se pudo guardar la sucursal'});
                        }
                    });
                }
            });
    }else{
        res.send({mesage:'Ingrese todos los datos'});
    }
}

function updateSubsidiary(req, res){
    let subId = req.params.id;
    var update = req.body;

    Subsidiary.findByIdAndUpdate(subId, update, {new:true}, (err, subUpdated)=>{
        if(err){
            res.status(500).send({mesage:'Error'});
        }else if(enterpriseUpdate){
            res.send({subUpdated:subUpdated});
        }else{
            res.status(418).send({mesage:'No se pudo actualizar'});
        }
    });
}

function removeSubsidiary(req, res){
    let subId = req.params.id;

    Subsidiary.findByIdAndRemove(subId, {new:true}, (err, subRemove)=>{
        if(err){
            res.status(500).send({mesage:'Error'});
        }else if(subRemove){
            res.send({mesage:'se elimino la sucursal'});
        }else{
            res.status(418).send({mesage:'No se pudo actualizar'});
        }
    });
}

function asignProduct(req, res){
    let  subId = req.params.id;
    let  params = req.body;
    let product = new Product();
    
    Subsidiary.findById(subId, (err, subOk)=>{
        if(err){
            res.status(500).send({mesage:'Error en el servidor'});
        }else if(subOk){
            if(params.stock && params.product){
                Subsidiary.findOne({_id: subId,"products.product": params.product}, (err, productOk)=>{
                    if(err){
                        res.status(500).send({mesage:'error en el servidor'});
                    }else if(productOk){
                        res.send({mesage: 'El producto ya esta asignado'});
                    }else{
                        product.stock = params.stock;
                        product.product = params.product;
                        Subsidiary.findOne({SC:params.SC, "products.product": params.product,"products.stock":{$gte:params.stock}}, (err, ok)=>{
                        if(err){
                            res.status(500).send({message:'error en el servidor'});
                        }else if(ok){
                                Subsidiary.findOneAndUpdate({_id: subId}, {$push:{products:product}}, {new:true}, (err, productAsign)=>{
                                    if(err){
                                        res.status(500).send({mesage:'Error en el servidor'});
                                    }else if(productAsign){
                                        res.send({productAsign:productAsign});
                                    }else{
                                        res.status(418).send({mesage:'no se pudo asignar el producto'});
                                    }
                                });
                            }else{
                                res.status(500).send({message:'no hay stock suficiente'});
                            }
                        });
                    } 
                });
            }else{
                res.send({mesage:'Ingrese todos los datos'});
            }
        }else{
            res.send({mesage:'La sucursal no existe'});
        }
    });

}

function listSubs(req, res){
        Subsidiary.find({}, (err, EnterpriseL)=>{
            if(err){
                res.status(500).send({message:'error'});
            }else if(EnterpriseL){
                res.status(200).send({message:EnterpriseL});
            }else{
                res.status(500).send({message:'No hay registros que mostrar'});
            }
        }).populate('products.product');
}

function searchSub(req, res){
    let subId = req.params.id;
    let params = req.body;
    if(params.stock){
        Subsidiary.find({_id:subId, CE:params.CE},{products:{$elemMatch:{stock:params.stock}}},(err, result)=>{
            if(err){
                res.status(500).send({message:'Error en el servidor'});
            }else if(result){ 
                res.send({result:result+result.stock});
            }else{
                res.status(404).send({message:'Ningun registro coincide con el criterio'});
            }
        }).populate('products.product');
    }else if(params.name){
        Subsidiary.find({_id:subId, CE:params.CE},{products:1},(err, result)=>{
            if(err){
                res.status(500).send({message:'Error en el servidor'});
            }else if(result){
                res.send({result:result});
            }else{
                res.status(404).send({message:'Ningun registro coincide con el criterio'});
            }
        }).populate({path:'products.product' ,match:{name:params.name}});
    }

    
}

module.exports = {
    saveSubsidiary,
    updateSubsidiary, 
    removeSubsidiary,
    asignProduct,
    listSubs,
    searchSub
}
