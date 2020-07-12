'use strict'
var jwt = require('jwt-simple');
var moment =  require('moment');
var key = 'key-impenetrable-777';

exports.createToken = (enterprise)=>{
    var payload ={
        sub: enterprise._id,
        CE: enterprise.CE,
        name: enterprise.name,
        description: enterprise.description,
        address: enterprise.address,
        phone: enterprise.phone,
        fax: enterprise.fax,
        email: enterprise.emai,
        iat: moment().unix(),
        exp: moment().add(1, "day").unix()
    }
    return jwt.encode(payload, key);
}