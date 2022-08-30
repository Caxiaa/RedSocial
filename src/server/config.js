const path = require('path');
const {engine} = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index.js');
const errorHandler = require('errorhandler');

module.exports =  (app) =>{

    //Settings
    app.set('port',process.env.PORT || 4000);

    app.engine('handlebars',engine());
    app.set('views',path.join(__dirname, '../views'));
    app.set('view engine','handlebars');

    //Middlewares 
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname,'../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    
    //routes
    routes(app);

    //static files
    app.use('/public',express.static(path.join(__dirname,'../public')));

    //errorhandler
    if(app.get('env') === 'develompent'){
        app.use(errorHandler);
    }



    return app;
}