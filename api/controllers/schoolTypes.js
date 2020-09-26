const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SchoolTypes = require("../models/schoolTypes");
const Level = require("../models/level");

exports.schoolTypes_get_all = async (req, res, next) => {
    SchoolTypes.find()
        .then(result => {
            if (result) {
                Level.find()
                    .then(levels => {
                        return res.status(200).json({
                            schoolTypes: result.map(doc => {
                                return {
                                    _id: doc._id,
                                    type: doc.type,
                                    addedAt: doc.addedAt,
                                    levels: levels
                                }
                            }),
                        });
                    })
                    .catch(err => {
                        return res.status(204).json({
                            error: err,
                        });
                    })
            } else {
                return res.status(204).json({
                    message: "No data found!",
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
};

exports.schoolTypes_create_schoolType = async (req, res, next) => {
    const newSchoolTypes = new SchoolTypes(
        { type: req.body.type, addedAt: new Date().toISOString() },
    );
    newSchoolTypes.save()
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "added successfully",
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

