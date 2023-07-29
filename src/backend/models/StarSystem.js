const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StarSystemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    planets: [{
        type: Schema.Types.ObjectId,
        ref: 'Planet'
    }]
});

module.exports = mongoose.model('StarSystem', StarSystemSchema);
