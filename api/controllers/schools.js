const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const School = require("../models/school");

exports.schools_get_all = async (req, res, next) => {
    School.find()
        .then(result => {
            if (result) {
                return res.status(200).json({
                    schools: result.map(doc => {
                        return {
                            _id: doc._id,
                            name: doc.name,
                            type: doc.type,
                            city: doc.city,
                            addedAt: doc.addedAt
                        }
                    }),
                });
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

exports.Schools_create_school = async (req, res, next) => {
    const school = req.body;
    const addSchool = new School({
        name: school.name,
        type: school.type,
        city: school.city,
        addedAt: new Date().toISOString()
    });
    addSchool.save()
        .then(result => {
            return res.status(201).json({
                message: "added successfully",
            });
        })
        .catch(err => {
            return res.status(500).json({
                err: err,
            });
        });
};

