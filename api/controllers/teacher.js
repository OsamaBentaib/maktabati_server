const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");
const TeacherData = require("../models/teacherData");

exports.teacher_access = async (req, res, next) => {
    User.findOne({ phone: req.body.phone })
        .then(checkUser => {
            if (checkUser) {
                bcrypt.compare(req.body.password, checkUser.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                phone: checkUser.phone,
                                password: checkUser.password,
                                Id: checkUser._id
                            },
                            "somesupersecretkey",
                            {
                                expiresIn: "24h"
                            }
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token,
                            _id: checkUser._id,
                            phone: result.phone
                        });
                    }
                    res.status(401).json({
                        message: "Auth failed"
                    });
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const newTeacher = new Teacher({
                            phone: req.body.phone,
                            password: hash
                        });
                        newTeacher.save()
                            .then(result => {
                                const token = jwt.sign(
                                    {
                                        phone: result.phone,
                                        password: result.password,
                                        _id: result._id
                                    },
                                    "somesupersecretkey",
                                    {
                                        expiresIn: "24h"
                                    }
                                );
                                return res.status(200).json({
                                    message: "Auth successful",
                                    token: token,
                                    Id: result._id,
                                    phone: result.phone
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json({
                                    error: "Something wont wrong please try again later!"
                                });
                            })
                    }
                });

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: "Something wont wrong please try again later!"
            });
        });
};

exports.teachers_create_teacherData = async (req, res, next) => {
    const teacher = req.body.teacher;
    const city = req.body.city;
    const school = req.body.school;
    const teacherData = new TeacherData({
        teacher: teacher,
        city: city,
        school: school,
    });
    teacherData.save()
        .then(result => {
            return res.status(201).json({
                message: "added successfully",
                teacher: result,
            });
        });
};
