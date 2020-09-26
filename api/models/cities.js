const mongoose = require('mongoose');

const citiesSchema = mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    addedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Cities', citiesSchema);