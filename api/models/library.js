const mongoose = require('mongoose');

const librarySchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    addedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Library', librarySchema);