const express = require('express');
const planetRouter = express.Router();
const { verifyToken } = require('../utils/auth');
const { getPlanet, createPlanet, updatePlanet, deletePlanet } = require('../controllers/planetController');
const { getImagesForPlanet, addImagesToPlanet, removeImageFromPlanet } = require('../controllers/imageController');

// get all planets for star is in starRoutes.js
planetRouter.get('/:id', verifyToken, getPlanet);
planetRouter.post('/', verifyToken, createPlanet);
planetRouter.put('/:id', verifyToken, updatePlanet);
planetRouter.delete('/:id', verifyToken, deletePlanet);

//---Image Routes-----------------------------------------------------------------------
planetRouter.get('/:id/images', verifyToken, getImagesForPlanet);
planetRouter.post('/:id/images', verifyToken, addImagesToPlanet);
planetRouter.delete('/:id/images/:imageId', verifyToken, removeImageFromPlanet);

module.exports = planetRouter;
