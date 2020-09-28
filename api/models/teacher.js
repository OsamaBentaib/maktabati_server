const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    joinedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);