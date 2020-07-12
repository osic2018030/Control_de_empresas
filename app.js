var express = require('express');
var bodyParser =  require('body-parser');
var enterpriseRouters =  require('./routes/enterprise.route');
var employeeRouters = require('./routes/employee.route');
var productRouters = require('./routes/product.route');
var subsidiaryRouters = require('./routes/subsidiary.route');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use(enterpriseRouters);
app.use(employeeRouters);
app.use(productRouters);
app.use(subsidiaryRouters);
module.exports = app;
