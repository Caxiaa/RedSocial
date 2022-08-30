const express = require('express');
const home = require('../controllers/home.js');
const image = require('../controllers/image.js');

const router = express.Router();


module.exports = app =>{
    app.use(router);
    
    router.get('/',home.index);

    router.get('/images/:image_id',image.index);

    router.post('/images',image.create);

    router.post('/images/:image_id/like',image.like);

    router.post('/images/:image_id/comment',image.comment);

    router.delete('/images/:image_id',image.remove);

}