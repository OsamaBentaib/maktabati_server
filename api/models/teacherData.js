const mongoose = require('mongoose');

const teacherDataSchema = mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    city: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    joinedAt: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('TeacherData', teacherDataSchema);