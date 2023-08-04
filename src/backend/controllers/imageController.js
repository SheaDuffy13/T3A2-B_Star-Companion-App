const { response } = require('express');
const { Planet, Image } = require('../models/Planet');
const cloudinary = require('../utils/cloudinary');

// Add images to a planet
exports.addImagesToPlanet = async (req, res) => {
try {
    const planetId = req.params.id;
    const planet = await Planet.findById(planetId);
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    // Extract base64 encoded image data from request body
    const base64EncodedImages = req.body.images;
    // Upload images to Cloudinary
    const resultPromises = base64EncodedImages.map(image => cloudinary.uploader.upload(image));
    const results = await Promise.all(resultPromises);
    const newImages = results.map(result => ({ url: result.secure_url }));
    planet.images.push(...newImages);
    await planet.save();
    res.status(201).json(planet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while uploading the images' });
  }
};

  
// Remove an image from a planet
exports.removeImageFromPlanet = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    // Find and remove image from planet
    const imageIndex = planet.images.findIndex(image => image._id.equals(req.params.imageId));
    if (imageIndex !== -1) {
      planet.images.splice(imageIndex, 1);
      await planet.save();
    }

    res.status(200).json(planet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

  
  // Get all images for a planet
  exports.getImagesForPlanet = async (req, res) => {
    try {
      const planet = await Planet.findById(req.params.id);
      if (!planet) {
        return res.status(404).json({ error: 'Planet not found' });
      }
  
      res.status(200).json(planet.images);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
