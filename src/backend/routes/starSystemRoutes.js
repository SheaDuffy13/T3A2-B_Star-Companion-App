const express = require('express')
const starRouter = express.Router();
const { getAllStars, getStar } = require('../controllers/starSystemController')

starRouter.get("/", getAllStars);
starRouter.get("/:id", getStar)

module.exports = starRouter