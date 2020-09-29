const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Parent = require("../models/parent");

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
            return res.status(201).json({
                message: "parent added Successfully!",
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: "Something wrong!",
            });
        });
};