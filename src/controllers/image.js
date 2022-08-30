const path = require('path');
const { randomName } = require('../helpers/libs.js');
const fs = require('fs-extra');
const { Image } = require('../models/index.js');


const ctrl = {};

ctrl.index = (req,res)=>{
    
};

ctrl.create = (req,res)=>{

    const saveImage = async () =>{
        const imgName = randomName();
        const images = await Image.find({filename: imgName});
        if(images.length > 0){
            saveImage();
        }else{
            const imagePath = req.file.path;
            const extension = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve('src/public/upload/'+imgName+extension);
    
            if(extension === '.png' || extension === '.jpg' || extension === 'jpeg' || extension === '.gif'){
                await fs.rename(imagePath,targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: imgName + extension,
                })
                const imageSaved = await newImg.save();
                res.send('works');
            }else{
                await fs.unlink(imagePath)
                res.status(500).json({error:'Only images!'})
            }
        }
    };
    saveImage();
};

ctrl.like = (req,res)=>{

};

ctrl.comment = (req,res)=>{

};

ctrl.remove = (req,res)=>{

};

module.exports = ctrl;