const mongoose = require('mongoose');

const noteBookSchema = mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    numberPages: {
        type: String,
        required: true,
    },
    schoolSupplies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolSuplies",
        required:true,
    }
});

module.exports = mongoose.model('NoteBook', noteBookSchema);