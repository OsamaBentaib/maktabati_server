const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    schoolSupplies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolSuplies",
        required: true,
    }
});

module.exports = mongoose.model('Book', bookSchema);