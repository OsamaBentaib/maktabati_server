const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PhoneVerify = require("../models/phoneVerify");
const Parent = require("../models/parent");
const Library = require("../models/library");
const Teacher = require("../models/teacher");

exports.verifyphone = async (req, res, next) => {
    const request = req.body;
    PhoneVerify.findOne({
        phone: request.phone,
        type: request.type,
        code: request.code,
    })
        .then(rt => {
            if (request.type == "FOR_PARENT") {
                Parent.updateOne({ phone: request.phone, _id: request._id }, { isVerified: true })
                    .then(ress => {
                        return res.status(200).json({
                            message: "verifed succesfully!!",
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: "Something wrong!",
                        });
                    });
            } else if (request.type == "FOR_LIBRARY") {
                Library.updateOne({ phone: request.phone, _id: request._id }, { isVerified: true })
                    .then(ress => {
                        return res.status(200).json({
                            message: "verifed succesfully!!",
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: "Something wrong!",
                        });
                    });
            } else if (request.type == "FOR_TEACHER") {
                Teacher.updateOne({ phone: request.phone, _id: request._id }, { isVerified: true, })
                    .then(ress => {
                        return res.status(200).json({
                            message: "verifed succesfully!!",
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: "Something wrong!",
                        });
                    });
            } else {
                return res.status(500).json({
                    error: "Something wrong!",
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: "Something wrong!",
            });
        });
};