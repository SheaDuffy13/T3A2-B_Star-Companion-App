const StarSystem = require('../models/StarSystem');

// Controller actions
module.exports.getAllStars = async (req, res) => {
  try {
    const starSystems = await StarSystem.find();
    console.log('Retrieved star systems:', starSystems);
    res.status(200).json(starSystems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports.getStar = async (req, res) => {
  const id = req.params.id;

  try {
    const starSystem = await StarSystem.findById(id).populate('planets');
    console.log('Retrieved star system:', starSystem);
    res.status(200).json(starSystem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
