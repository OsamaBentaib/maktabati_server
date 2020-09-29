const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Library = require("../models/library");

exports.libraries_get_all = async (req, res, next) => {
    const libraries = await Library.find();
    return res.status(201).json({
        libraries: libraries,
    });
};

exports.libraries_create_library = async (req, res, next) => {
    const library = req.body.library;
    const newLibrary = new Library({
        phone: library.phone,
        location: {
            lat: library.location.lat,
            log: library.location.lat,
            city: library.location.city,
        },
        addedAt: new Date().toISOString(),
    });
    newLibrary.save()
        .then(success => {
            return res.status(201).json({
                message: "Library added Successfully!",
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: "Something wrong!",
            });
        })
};