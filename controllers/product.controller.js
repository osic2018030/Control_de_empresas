'use strict'

var Product = require('../models/product.model');

function saveProduct(req, res){
    var product = new Product();
    var params = req.body;

    if(params.Code && params.name && params.brand && params.description){
        Product.findOne({Code:params.Code}, (err, productOk)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else if(productOk){
                res.send({message:'El producto con ese codigo ya existe'});
            }else{
                product.Code = params.Code;
                product.name = params.name;
                product.brand = params.brand;
                product.description = params.description;

                product.save((err, productSaved)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor'});
                    }else if(productSaved){
                        res.send({productSaved:productSaved});
                    }else{
                        res,status(418).send({message:'No se pudo guardar el producto'})
                    }
                });
            }
        });
    }
}

function updateProduct(req,res){
    let productId = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else if(productUpdated){
            res.send({productUpdated:productUpdated});
        }else{
            res.status(418).send({message:'No se pudo actualizar el producto'});
        }
    });
}

function removeProduct(req, res){
    let productId = req.params.id;

    Product.findByIdAndRemove(productId, (err, productUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else if(productUpdated){
            res.send({productUpdated:productUpdated});
        }else{
            res.status(418).send({message:'No se pudo actualizar el producto'});
        }
    });
}
module.exports = {
    saveProduct,
    updateProduct,
    removeProduct

}