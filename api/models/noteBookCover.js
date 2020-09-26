const mongoose = require('mongoose');

const noteBookCoverSchema = mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    schoolSupplies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolSuplies",
        required:true,
    }
});

module.exports = mongoose.model('NoteBookCover', noteBookCoverSchema);