'use strict';



var express = require('express');
var ArticleController = require('../controllers/ArticleController');

var router = express.Router();

//variables para poder recibir archivos
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/articles'});


//Rutas de prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controladores', ArticleController.test);

//rutas CRUD articulos
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);

//Ruta para subir imagen de articulo
router.post('/upload-image/:id?', md_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);

//Ruta para buscador
router.get('/search/:search', ArticleController.search);

module.exports = router;