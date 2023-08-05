const express = require('express');
const planetRouter = express.Router();
const { verifyToken } = require('../utils/auth');
const { getAllPlanets, getPlanet, createPlanet, updatePlanet, deletePlanet } = require('../controllers/planetController');
const { getImagesForPlanet, getAllImages, addImagesToPlanet, removeImageFromPlanet } = require('../controllers/imageController');

planetRouter.get('/', verifyToken, getAllPlanets);
planetRouter.get('/:id', verifyToken, getPlanet);
planetRouter.post('/', verifyToken, createPlanet);
planetRouter.put('/:id', verifyToken, updatePlanet);
planetRouter.delete('/:id', verifyToken, deletePlanet);

//---Image Routes-----------------------------------------------------------------------
planetRouter.get('/:id/images', verifyToken, getImagesForPlanet);
planetRouter.post('/:id/images', verifyToken, addImagesToPlanet);
planetRouter.delete('/:id/images/:imageId', verifyToken, removeImageFromPlanet);

module.exports = planetRouter;

//-----ORIGINAL--------------------
// const express = require('express');
// const planetRouter = express.Router();
// const cloudinary = require("../utils/cloudinary");
// // const { upload } = require('../utils/multer');
// const { getAllPlanets, getPlanet, createPlanet, updatePlanet, deletePlanet } = require('../controllers/planetController')
// const { getImagesForPlanet, getAllImages, addImagesToPlanet, removeImageFromPlanet } = require('../controllers/imageController')

// planetRouter.get('/', getAllPlanets);
// // planetRouter.get('/images', getAllImages);
// planetRouter.get('/:id', getPlanet);
// planetRouter.post('/', createPlanet);
// planetRouter.put('/:id', updatePlanet);
// planetRouter.delete('/:id', deletePlanet);

// //---Image Routes-----------------------------------------------------------------------
// planetRouter.get('/:id/images', getImagesForPlanet);
// // planetRouter.post('/:id/images', addImageToPlanet);
// planetRouter.post('/:id/images', addImagesToPlanet);
// planetRouter.delete('/:id/images/:imageId', removeImageFromPlanet);  

// module.exports = planetRouter;
