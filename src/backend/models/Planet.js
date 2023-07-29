const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    starSystem: {
        type: Schema.Types.ObjectId,
        ref: 'StarSystem',
        required: true
    },
    // images: [String],
    images: [{
        url: String,
        tags: [String]
    }],
    note: String
});

module.exports = mongoose.model('Planet', PlanetSchema);
