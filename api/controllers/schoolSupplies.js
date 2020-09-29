const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SchoolSupplies = require("../models/schoolSupplies");
const Teacher = require("../models/teacher");
const e = require("express");

exports.schoolSupplies_get = async (req, res, next) => {
    if (!req.isAuth) {
        return res.status(401).json({
            error: "Unauthorizated",
        });
    }
    Teacher.findById(req.Id)
        .then(X => {
            if (X) {
                SchoolSupplies.find({ teacher: X._id })
                    .exec()
                    .then(docs => {
                        res.status(200).json({
                            count: docs.length,
                            orders: docs.map(doc => {
                                return {
                                    schoolSupplies: doc
                                };
                            })
                        });
                    })
                    .catch(results => {
                        return res.status(500).json({
                            error: err,
                        });
                    })
            } else {
                return res.status(204).json({
                    message: "No teacher data",
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: "Something wrong!",
            });
        });
};

exports.schoolSupplies_create_one = async (req, res, next) => {
    if (!req.isAuth) {
        return res.status(401).json({
            error: "Unauthorizated",
        });
    }
    if (req.body.type === "Book") {
        const supplie = new SchoolSupplies({
            type: req.body.type,
            level: req.body.level,
            teacher: req.Id,
            book: {
                name: req.body.book.name
            },
        });
        supplie.save()
            .then(result => {
                return res.status(201).json({
                    message: "book Saved!",
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: "Something wrong!",
                });
            });
    } else if (req.body.type === "NoteBook") {
        const supplie = new SchoolSupplies({
            type: req.body.type,
            level: req.body.level,
            teacher: req.Id,
            noteBook: {
                size: req.body.noteBook.size,
                numberPages: req.body.noteBook.numberPages
            },
        });
        supplie.save()
            .then(result => {
                return res.status(201).json({
                    message: "NoteBook Saved!",
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: "Something wrong!",
                });
            });
    } else if (req.body.type === "NoteBookCover") {
        const supplie = new SchoolSupplies({
            type: req.body.type,
            level: req.body.level,
            teacher: req.Id,
            noteBookCover: {
                size: req.body.noteBookCover.size,
                color: req.body.noteBookCover.color
            },
        });
        supplie.save()
            .then(result => {
                return res.status(201).json({
                    message: "NoteBookCover Saved!",
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: "Something wrong!",
                });
            });
    } else {
        return res.status(500).json({
            error: "Please select a valid action type!",
        });
    }
};

exports.schoolSupplies_delete_one = async (req, res, next) => {
    if (!req.isAuth) {
        return res.status(401).json({
            error: "Unauthorizated",
        });
    }
    const id = req.params.Id;
    SchoolSupplies.deleteOne({ _id: id })
        .then(e => {
            return res.status(204).json({
                message: "deleted Successfully",
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: "Something wrong!",
            });
        })
};

