const mongoose = require('mongoose');

const librarySchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    location: {
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
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    addedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Library', librarySchema);