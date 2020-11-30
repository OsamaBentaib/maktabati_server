const mongoose = require('mongoose');

const phoneVerifySchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    ID: {
        type: String,
        required: true,
    },
    addedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('PhoneVerify', phoneVerifySchema);