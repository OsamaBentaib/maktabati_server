const mongoose = require('mongoose');

const schoolTypesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    schoolType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolType"
    },
    addedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Levels', schoolTypesSchema);