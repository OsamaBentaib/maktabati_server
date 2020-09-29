const mongoose = require('mongoose');

const schoolTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    levels: [
        {
            name: {
                type: String,
                required: true,
            },
        }
    ],
    addedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('SchoolType', schoolTypeSchema);