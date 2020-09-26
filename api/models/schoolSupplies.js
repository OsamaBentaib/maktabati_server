const mongoose = require('mongoose');

const schoolSuppliesSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
});

module.exports = mongoose.model('SchoolSuplies', schoolSuppliesSchema);