const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Level = require("../models/level");

exports.levels_create_level = async (req, res, next) => {
    const level = req.body;
    console.log(level);
    const addLevel = new Level({
        name: level.name,
        schoolType: level.type,
        addedAt: new Date().toISOString()
    });
    addLevel.save()
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

