const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Library = require("../models/library");
const Location = require("../models/location");

exports.libraries_get_all = async (req, res, next) => {
    const libraries = await Library.find();
    return res.status(201).json({
        libraries: libraries,
    });
};

exports.libraries_create_library = async (req, res, next) => {
    const library = req.body.library;
    const location = new Location({
        lat: library.location.lat,
        log: library.location.lat,
        city: library.location.city,
    });
    location.save()
        .then(result => {
            const newLibrary = new Library({
                phone: library.phone,
                location: result._id,
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
        })
        .catch(err => {
            return res.status(500).json({
                error: "Something wrong!",
            });
        })

};