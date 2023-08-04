const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  tags: [String]
});

const PlanetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  star: {
    type: Schema.Types.ObjectId,
    ref: 'StarSystem',
    required: true
  },
  images: [ImageSchema],
  note: String
});


const Planet = mongoose.model('Planet', PlanetSchema);
const Image = mongoose.model('Image', ImageSchema);

module.exports = { Planet, Image };


