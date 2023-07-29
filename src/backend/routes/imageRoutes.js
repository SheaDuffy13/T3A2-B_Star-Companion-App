const express = require('express');
const imageRouter = express.Router();
const { getAllImages, getImage, createImage, updateImage, deleteImage } = require('../controllers/imageController')

imageRouter.get('/', getAllImages);
imageRouter.get('/:id', getImage);
imageRouter.post('/', createImage);
imageRouter.put('/:id', updateImage);
imageRouter.delete('/:id', deleteImage);

module.exports = imageRouter;
