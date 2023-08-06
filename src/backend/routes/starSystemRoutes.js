const express = require('express')
const starRouter = express.Router();
const { verifyToken } = require('../utils/auth');
const { getAllStars, getStar, getAllPlanets } = require('../controllers/starSystemController')

starRouter.route('/').get(getAllStars);
starRouter.get("/:id", getStar)
starRouter.get('/:id/planet', verifyToken, (req, res, next) => {
    req.starId = req.params.id;
    next();
  }, getAllPlanets);

module.exports = starRouter