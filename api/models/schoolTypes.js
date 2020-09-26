const mongoose = require('mongoose');

const schoolTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    schools: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    levels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Levels"
        }
    ],
    addedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('SchoolType', schoolTypeSchema);