const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolType"
    },
    city: {
        type: String,
        required: true,
    },
    addedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('School', schoolSchema);