'use strict'
var Subsidiary = require('../models/subsidiary.model');
var Employee = require('../models/employee.model');


function saveEmployee(req, res){
    let subsidiaryId = req.params.id;
    let employeeParams =  req.body;
    let employee = new Employee();

    Subsidiary.findById(subsidiaryId, (err, enterpriseOk)=>{
        if(err){
            res.status(500).send({message:'error en el servidor'});
        }else if(enterpriseOk){
            if(employeeParams.CP && employeeParams.name && employeeParams.lastname && employeeParams.age && employeeParams.job && employeeParams.department && employeeParams.phone && employeeParams.email){
                Subsidiary.findOne({"employees.CP": employeeParams.CP}, (err, exist)=>{
                    if(err){
                    res.status(500).send({message:'Error en el servidor'});
                    }else if(exist){
                    res.send({message:'ya existe el empleado'});
                    }else{
                    employee.CP = employeeParams.CP;
                    employee.name = employeeParams.name;
                    employee.lastname = employeeParams.lastname;
                    employee.age =  employeeParams.age;
                    employee.job = employeeParams.job;
                    employee.department = employeeParams.department;
                    employee.phone = employeeParams.phone;
                    employee.email = employeeParams.email;
    
                    Subsidiary.findOneAndUpdate({_id:subsidiaryId}, {$push:{employees:employee}}, {new: true}, (err, employeeSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error en el servidor'});
                        }else if(employeeSaved){
                            res.send({enterprise: employeeSaved});
                        }else{
                            res.status(500).send({message:'No se guardo el empleado'})
                        }
                    });
                    }
                });
                
            }else{
                res.send({message:'Ingrese todo los datos'})
            }
        }else{
            res.status(404).send({message:'La empresa a la cual se quiere guardar el empleado n existe'});
        }
    });
}

function updateEmployee(req, res){
    let subId = req.params.id;
    let employeeId = req.params.ide;
    let update = req.body;
    let employeeSaved;

    Subsidiary.findOne({'_id':subId, 'employees._id':employeeId}, (err, enterFind)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else if(enterFind){
            employeeSaved = enterFind.employees.find(element => element._id==employeeId);
            Subsidiary.findOneAndUpdate({'_id':enterpriseId, 'employees._id':employeeId},
            {"employees.$.name": update.name || employeeSaved.name,
            "employees.$.lastname": update.lastname || employeeSaved.lastname,
            "employees.$.age": update.age || employeeSaved.age,
            "employees.$.job": update.job || employeeSaved.job,
            "employees.$.department": update.department || employeeSaved.department,
            "employees.$.phone": update.phone || employeeSaved.phone,
            "employees.$.email": update.email || employeeSaved.email},{new:true}, (err, subUp)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(subUp){
                    res.send({subUp: subUp});
                }else{
                    res.status(418).send({message:'empleado no actualizado'});
                }
            });

        }else{
            res.status(404).send({message:'Empresa o empleado no encontrado o inexistente'});
        }
    });
    
}

function removeEmployee(req, res){
    let subId = req.params.id;
    let employeeId = req.params.ide;
    Subsidiary.findOneAndUpdate({'_id':subId, 'employees._id':employeeId}, {$pull:{employees:{_id:employeeId}}}, {new:true}, (err, employeeRemove)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else if(employeeRemove){
            res.send({message:'Empleado eliminado'});
        }else{
            res.send(418).send({message: 'empleado no eliminado'});
        }
    });
}

function listEmployee(req, res){
    let subId = req.params.id;
    Subsidiary.findOne({_id:subId}, (err, empleado)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else if(empleado)  {
            var num=empleado.employees.length;
            res.send({'empleados en la empresa':empleado.name+': '+num});
        }else{
            res.status(404).send({message:'No hay empleados'});
        }
    });
}

function search(req, res){
    let subId = req.params.id;
    let param = req.body.param;
    if(param==''){
        Subsidiary.find({_id: subId}, (err, empleados)=>{
            if(err){
                res.status(500).send({message:'error en el servidor'});
            }else if(empleados){
                res.send({empleados: empleados})
            }else{
                res.status(404).send({message:'no se encontraron empleaodos'});
            }
        });
    }else{
        Subsidiary.find({_id: subId}, {employees:{$elemMatch:{$or:[{name:{$regex:param}},{job:{$regex:param}}
            ,{department:{$regex:param}}]}}}, (err, empleados)=>{
            if(err){
                res.status(500).send({message:'error en el servidor'});
            }else if(empleados){
                res.send({empleados: empleados})
            }else{
                res.status(404).send({message:'no se encontraron empleaodos'});
            }
        });
    }
        

}

module.exports = {
    saveEmployee,
    updateEmployee,
    removeEmployee,
    listEmployee,
    search
}