const { Planet } = require('../models/Planet');
const Star = require('../models/StarSystem');


// Get a single planet by ID
exports.getPlanet = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id).populate('star');
    res.status(200).json(planet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create a new planet
exports.createPlanet = async (req, res) => {
  try {
    const star = await Star.findById(req.body.star);
    if (!star) {
      return res.status(404).json({ error: 'Star not found' });
    }

    const planet = await Planet.create({
      ...req.body,
      userId: req.userId
    });
    star.planets.push(planet._id);
    await star.save();

    res.status(201).json(planet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a planet by ID
exports.updatePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('star');

    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    res.status(200).json(planet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a planet by ID
exports.deletePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByIdAndDelete(req.params.id);
    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    const star = await Star.findById(planet.star);
    if (star) {
      star.planets.pull(planet._id);
      await star.save();
    }

    res.status(204).json(null);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//---NOTE CONTROLLERS-----------------------------------------------------

// Add a note to a planet
exports.addNoteToPlanet = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    planet.notes.push(req.body.note);
    await planet.save();

    res.status(200).json(planet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove a note from a planet
exports.removeNoteFromPlanet = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update a note for a planet
exports.updateNote = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    const noteIndex = planet.notes.findIndex(note => note._id.equals(req.params.noteId));
    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    planet.notes[noteIndex] = req.body.note;
    await planet.save();
    res.status(200).json(planet);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
