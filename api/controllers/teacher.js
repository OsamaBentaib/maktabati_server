const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");
const PhoneVerify = require("../models/phoneVerify");
const TeacherData = require("../models/teacherData");
const { sendWhatsapp } = require("./sendWhatsapp");

exports.teacher_access = async (req, res, next) => {
  Teacher.findOne({ phone: req.body.phone })
    .then((checkUser) => {
      if (checkUser) {
        /*
         *=================
         * TEACHERE ALREADY EXIST
         *=================
         */
        bcrypt.compare(req.body.password, checkUser.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                phone: checkUser.phone,
                password: checkUser.password,
                Id: checkUser._id,
              },
              "somesupersecretkey",
              {
                expiresIn: "24h",
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              _id: checkUser._id,
              phone: checkUser.phone,
            });
          }
          res.status(401).json({
            message: "Auth failed",
          });
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          } else {
            const newTeacher = new Teacher({
              phone: req.body.phone,
              password: hash,
              joinedAt: new Date().toISOString(),
            });
            newTeacher
              .save()
              .then((result) => {
                const code = 123456;
                const verifyPhone = new PhoneVerify({
                  phone: result.phone,
                  type: "FOR_TEACHER",
                  code: code,
                  ID: result._id,
                  addedAt: new Date().toISOString(),
                });
                verifyPhone.save(code, result.phone);
                sendWhatsapp()
                  .then((rt) => {
                    const token = jwt.sign(
                      {
                        phone: result.phone,
                        password: result.password,
                        _id: result._id,
                      },
                      "somesupersecretkey",
                      {
                        expiresIn: "24h",
                      }
                    );
                    return res.status(201).json({
                      message: "Auth successful",
                      token: token,
                      _id: result._id,
                      phone: result.phone,
                    });
                  })
                  .catch((err) => {
                    return res.status(500).json({
                      error: "Something wrong!",
                    });
                  });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  error: "Something wont wrong please try again later!",
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: "Something wont wrong please try again later!",
      });
    });
};

exports.teachers_create_teacherData = async (req, res, next) => {
  if (!req.isAuth) {
    return res.status(500).json({
      error: "UnAuthoooooo!",
    });
  }
  const city = req.body.city;
  const school = req.body.school;
  const teacher = req.body.teacher;
  Teacher.findById(teacher)
    .then((checkUser) => {
      if (checkUser) {
        const teacherData = new TeacherData({
          teacher: teacher,
          city: city,
          school: school,
        });
        teacherData.save().then((result) => {
          return res.status(201).json({
            message: "added successfully",
            teacher: result,
          });
        });
      } else {
        return res.status(204).json({
          error: "No teacher",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
};
