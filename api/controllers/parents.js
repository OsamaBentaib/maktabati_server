const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Parent = require("../models/parent");
const PhoneVerify = require("../models/phoneVerify");

exports.parents_get_all = async (req, res, next) => {
    const parents = await Parent.find();
    return res.status(201).json({
        parents: parents,
    });
};

exports.parents_create_parent = async (req, res, next) => {
    const parent = req.body;
    const newParent = new Parent({
        phone: parent.phone,
        city: parent.city,
        level: parent.level,
        school: parent.school,
        addedAt: new Date().toISOString(),
    });
    newParent.save()
        .then(success => {
            const verifyPhone = new PhoneVerify({
                phone: success.phone,
                type: "FOR_PARENT",
                code: 123456,
                ID: success._id,
                addedAt: new Date().toISOString(),
            });
            verifyPhone.save()
                .then(rt => {
                    return res.status(201).json({
                        message: "parent added Successfully!",
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        error: "Something wrong!",
                    });
                });
        })
        .catch(err => {
            return res.status(500).json({
                error: "Something wrong!",
            });
        });
};