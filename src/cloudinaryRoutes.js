// routes/cloudinaryRoutes.js
const express = require('express');
const fs = require('fs');
const router = express.Router();
const cloudinary = require('./cloudinaryConfig');
const multer = require('multer');
const upload = multer({ dest: 'uploads'});

router.post('/upload', upload.single('image'), async (req, res) => {
   try{
    const result = await cloudinary.uploader.upload(req.file.path);
    // Eliminar el archivo temporal
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo temporal:', err);
      }
    });
    res.status(200).send(result);
   }catch(err){
    res.status(400).send(err.message);
   }
});

 

module.exports = router;