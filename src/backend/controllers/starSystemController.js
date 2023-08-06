const StarSystem = require('../models/StarSystem');
const { Planet } = require('../models/Planet');


// Controller actions
module.exports.getAllStars = async (req, res) => {
  try {
    const starSystems = await StarSystem.find();
    res.status(200).json(starSystems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports.getStar = async (req, res) => {
  const id = req.params.id;

  try {
    const starSystem = await StarSystem.findById(id).populate('planets');
    res.status(200).json(starSystem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get all planets
exports.getAllPlanets = async (req, res) => {
  try {
    // Fetch all planets that belong to the currently logged-in user and are associated with the specified star
    const planets = await Planet.find({ userId: req.userId, star: req.starId }).populate('star');
    res.status(200).json(planets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
