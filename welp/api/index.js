'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// Conectarnos a la base de datos 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Red_social', { useMongoClient: true})
        .then(() => {
            console.log("La conexión a la base de datos Red_social se ha realizado correctamente !!");
        
            // crear servidor 
            app.listen(port, () => {
                console.log("Servidor Corriendo en http://localhost:3800");
            });
        })
        .catch(err => console.log(err));