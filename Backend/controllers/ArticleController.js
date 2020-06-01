'use strict';

var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Article = require('../models/article');

var controller = {
    datosCurso: function(req, res) {
        return res.status(200).send(
            {
                curso: "Master en Frameworks js",
                autor: "Xavier Decker",
                url: "google.com"
            });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: "Soy un test de mi controlador de articulos"
        });
    },

    save: (req, res) => {
        //Recoger parametros por post
        var params = req.body;

        //Validar datos(validator)
        try{
            //dara true la variable cuando no este vacio
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            console.log(validate_title);
        }catch(err){
            return res.status(404).send({
               status: 'error',
                message: 'Faltan datos para enviar'
            });
        }

        if(validate_title && validate_content) {

            //Crear objeto a guardar
            var article = new Article();
            article.title = params.title;
            article.content = params.content;
            if(article.image){
                article.image = params.image;
                console.log(article.image);
            }else{
                article.image = null;
                console.log('no hay imagen !');
            }



            //guardar el articulo
            article.save((err, articleStored) => {
                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });


            });



        } else{
            //Devolver respuesta
            return res.status(402).send({
                status: 'error',
                message: 'los datos no son validos'
            });
        }
        //Asignar valores

        //Guardar articulo


    }, //end metodo save

    getArticles: (req, res) => {

        var query = Article.find({});
        var last = req.params.last;

        if (last || last !== undefined){
            query.limit(5);
        }


        //Find para sacar los datos de la DB
        query.sort('-_id').exec((err, articles) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontraron articulos'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });

        });


    }, //end getArticles

    getArticle: (req, res) => {

        //recoger el id de la url
        var articleId = req.params.id;

        //comprobar que existe
        if(!articleId){
            return res.status(404).send({
                status: 'error',
                message: 'No se encontraron articulos'

            });
        }
        //Buscar el articulo
        Article.findById(articleId, (err, article) => {

           if(err || !article){

               return res.status(404).send({
                   status: 'error',
                   message: 'No existe articulo'

               });

           }

            return res.status(200).send({
                status: 'success',
                article

            });


        });
        //Devolver Respuesta


    }, //end getArticle


    update: (req,res) => {

        //Recoger el id por la url
        var articleId = req.params.id;

        //Recoger los datos por put
        var params = req.body;

        //validar los datos
        try{
            //sera true si no esta vacio
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }
        catch(err){

            return res.status(402).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content){

            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) =>{
                if(err){

                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!articleUpdated){

                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe articulo'
                    });
                }


                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });

            });

        } else {


            return res.status(500).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });

        }


        //Hacer un find and update

        //Devolver respuesta


    }, //end update


    delete: (req,res) =>{

        //Recoger el id de la url

        var articleId = req.params.id;


        // hacer find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved)=>{
           if(err){
               return res.status(500).send({
                   status: 'error',
                   message: 'Error al borrar'
               });
           }

           if(!articleRemoved){
               return res.status(404).send({
                   status: 'error',
                   message: 'No existe articulo a borrar'
               });
           }

            return res.status(200).send({
                status: 'success',
                message: 'Articulo borrado',
                article: articleRemoved
            });

        });



    }, //end delete

    upload: (req, res) =>{

        //Configurar el modulo connect multiparty router/article.js done


        // Recoger el fichero de la peticion
        var file_name = 'Imagen no subida...';

        if(!req.files){

            return res.status(400).send({
                status: 'error de file',
                message: file_name

            });
        }
        console.log(req.files.image.path);
        //Conseguir nombre y la extension del archivo
        var file_path = req.files.image.path;

        var file_split = file_path.split('\\');

        // *ADVERTENCIA EN LINUX O MAC *
        // var file_split = file_path.split('\');

        //Nombre del archivo
         file_name = file_split[2];

        //Extension del archivo
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //Comprobar la extension, solo imagenes, si no es valido borrar fichero

        if (file_ext !== 'png' && file_ext !== 'jpg' && file_ext !== 'jpeg' && file_ext !== 'gif'){
        //Borrar el archivo subido

            fs.unlink(file_path, (err) =>{

                return res.status(500).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida'


                });
            });


        } else {

            //si stodo es valido buscar el articulo, asignar nombre de imagen y actualizar

            var articleId = req.params.id;

            if(articleId){

                Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated)=>{

                    if(err || !articleUpdated){

                        return res.status(404).send({
                            status: 'error',
                            message: 'error al guardar imagen de articulo'

                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                });

            } else{
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
            }



        }



    }, //end upload

//OBTENER IMAGEN POR NOMBRE
    getImage: (req,res) => {

        var file = req.params.image;
        var path_file = './upload/articles/'+file;

        fs.exists(path_file,(exists) => {

            if(exists){

                return res.sendfile(path.resolve(path_file));

            } else {

                return res.status(404).send({
                    status: 'error',
                    message: 'la imagen no existe'
                });


            }
        });




    }, //end getImage


    search: (req,res) => {

        //sacar el string a buscar
        var searchString = req.params.search;

        //Find or
        Article.find({"$or": [

                {"title" : {"$regex": searchString, "$options": "i"}},
                {"content" : {"$regex": searchString, "$options": "i"}}
            ]})
            .sort([['date', 'descending']])
            .exec((err, articles)=>{

                if(err){

                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la peticion'
                    });
                }

                if(!articles || articles.length <= 0){

                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay articulos que coincidan con tu busqueda'
                    });

                }

                return res.status(200).send({
                   status: 'success',
                   articles
                });

            });




    }


}; //end controller

module.exports = controller;