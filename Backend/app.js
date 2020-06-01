'use strict';

//Cargar modulos de node para crear servidor

var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express
var app = express();

//Cargar ficheros de rutas
var article_routes = require('./routes/article');


//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CORS
//permitir el acceso o llamadas ajax al api desde cualquier frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //cualquier frente puede hacer peticiones ajax
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




// Aniadir prefijos a rutas / cargar rutas
app.use('/api', article_routes);

// Exportar modulos
module.exports = app;