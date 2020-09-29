const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SchoolTypes = require("../models/schoolTypes");
const TeacherData = require("../models/teacherData");

exports.schoolTypes_get_all = async (req, res, next) => {
    SchoolTypes.find()
        .then(result => {
            console.log(result);
            if (result) {
                return res.status(200).json({
                    schoolTypes: result,
                });
            } else {
                return res.status(204).json({
                    message: "No data found!",
                });
            }
        })
        .catch(err => {
            console.log(err);
            console.log("err 2");
            return res.status(500).json({
                error: err,
            });
        });
};

exports.schoolTypes_get_teacher_level = async (req, res, next) => {
    if (!req.isAuth) {
        return res.status(401).json({
            error: "Unauutttt",
        });
    }
    TeacherData.findOne({ teacher: req.params.Id })
        .then(s => {
            console.log(s);
            if (s) {
                SchoolTypes.findOne({ school: s.school })
                    .then(result => {
                        console.log(result);
                        if (result) {
                            return res.status(200).json({
                                schoolTypes: result,
                            });
                        } else {
                            return res.status(204).json({
                                message: "No data found!",
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        console.log("err 2");
                        return res.status(500).json({
                            error: err,
                        });
                    });
            } else {
                return res.status(204).json({
                    error: "No teacher with folowing data~!",
                });
            }
        })
        .catch(err => {
            console.log(err);
            console.log("err 2");
            return res.status(500).json({
                error: err,
            });
        });
};

exports.schoolTypes_create_schoolType = async (req, res, next) => {
    const newSchoolTypes = new SchoolTypes(
        {
            type: req.body.type,
            school: req.body.school,
            addedAt: new Date().toISOString(),
            levels: req.body.levels.map(level => {
                return { name: level.name }
            }),
        },
    );
    newSchoolTypes.save()
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "added successfully",
                result: result,
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
};

exports.schoolTypes_delete_schoolType = async (req, res, next) => {
    const id = req.params.Id;

    SchoolTypes.deleteOne({ _id: id })
        .then(result => {
            return res.status(204).json({
                message: "Deleted Successfully!",
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
};

