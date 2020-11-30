const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PhoneVerify = require("../models/phoneVerify");
const Library = require("../models/library");

exports.libraries_get_all = async (req, res, next) => {
    const libraries = await Library.find();
    return res.status(201).json({
        libraries: libraries,
    });
};

exports.libraries_create_library = async (req, res, next) => {
    const library = req.body;
    const newLibrary = new Library({
        phone: library.phone,
        location: {
            lat: library.location.lat,
            lng: library.location.lng,
            city: library.location.city,
        },
        addedAt: new Date().toISOString(),
    });
    newLibrary.save()
        .then(success => {
            const verifyPhone = new PhoneVerify({
                phone: success.phone,
                type: "FOR_LIBRARY",
                code: 123456,
                ID: success._id,
                addedAt: new Date().toISOString(),
            });
            verifyPhone.save()
                .then(rt => {
                    return res.status(201).json({
                        message: "Library added Successfully!",
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        error: "Something wrong!",
                    });
                });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: "Something wrong!",
            });
        })
};