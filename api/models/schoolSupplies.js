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
    },
    book: {
        name: {
            type: String,
        }
    },
    noteBook: {
        size: {
            type: String,
        },
        numberPages: {
            type: Number,
        }
    },
    noteBookCover: {
        size: {
            type: String,
        },
        color: {
            type: String,
        }
    },
});

module.exports = mongoose.model('SchoolSuplies', schoolSuppliesSchema);