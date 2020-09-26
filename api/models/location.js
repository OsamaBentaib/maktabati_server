const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Location', locationSchema);