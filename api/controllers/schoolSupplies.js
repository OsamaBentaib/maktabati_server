const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const School = require("../models/school");
const SchoolSupplies = require("../models/schoolSupplies");
const Book = require("../models/book");
const NoteBook = require("../models/noteBook");
const NoteBookCover = require("../models/noteBookCover");

exports.schoolSupplies_create_one = async (req, res, next) => {
    if (!req.isAuth) {
        return res.status(401).json({
            error: "Unauthorizated",
        });
    }
    if (req.body.type === "Book" || req.body.type === "NoteBook" || req.body.type === "NoteBookCover") {
        const supplie = new SchoolSupplies({
            type: req.body.type,
            level: req.body.level,
            teacher: req.Id
        });
        supplie.save()
            .then(result => {
                if (req.body.type === "Book") {
                    const book = new Book({
                        name: req.body.book.name,
                        schoolSupplies: result._id
                    });
                    book.save()
                        .then(r => {
                            return res.status(201).json({
                                message: "book Saved!",
                            });
                        })
                } else if (req.body.type === "NoteBook") {
                    const noteBook = new NoteBook({
                        size: req.body.noteBook.size,
                        numberPages: req.body.noteBook.numberPages,
                        schoolSupplies: result._id
                    });
                    noteBook.save()
                        .then(r => {
                            return res.status(201).json({
                                message: "noteBook Saved!",
                            });
                        });
                } else if (req.body.type === "NoteBookCover") {
                    const noteBookCover = new NoteBookCover({
                        size: req.body.noteBookCover.size,
                        color: req.body.noteBook.color,
                        schoolSupplies: result._id
                    });
                    noteBook.save()
                        .then(r => {
                            return res.status(201).json({
                                message: "noteBookCover Saved!",
                            });
                        });
                }
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

