const express = require('express');
const planetRouter = express.Router();
const { getAllPlanets, getPlanet, createPlanet, updatePlanet, deletePlanet } = require('../controllers/planetController')

planetRouter.get('/', getAllPlanets);
planetRouter.get('/:id', getPlanet);
planetRouter.post('/', createPlanet);
planetRouter.put('/:id', updatePlanet);
planetRouter.delete('/:id', deletePlanet);

module.exports = planetRouter;
