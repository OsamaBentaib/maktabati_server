const mongoose = require('mongoose');

const parentsSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
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

module.exports = mongoose.model('Parents', parentsSchema);