const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cities = require("../models/cities");

exports.cities_get_all = async (req, res, next) => {
    const keyWord = req.params.keyword;
    let cities;
    if (keyWord === undefined || keyWord === null || keyWord === "") {
        Cities.find()
            .then(cities => {
                return res.status(200).json({
                    cities: cities,
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: err,
                });
            });
    } else {
        Cities.find()
            .then(cities => {
                return res.status(200).json({
                    cities: cities,
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: err,
                });
            });
    }
};

exports.cities_create_city = async (req, res, next) => {
    const newCities = req.body.cities;
    newCities.map(async (city) => {
        const addCities = new Cities({
            city: city.city,
            addedAt: new Date().toISOString()
        });
        addCities.save().then(res => { console.log(res) });
    });
    return res.status(201).json({
        message: "added successfully",
    });
};

