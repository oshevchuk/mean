const express = require('express');
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post('/signup', (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(result => {
    res.status(201).json({
      message: 'User created',
      res: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.post("/login", (req, res, next) => {
  let user;
  User.findOne({email: req.body.email })
    .then(userF => {
      if (!userF) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      user = userF;
      return req.body.password === user.password;
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign({email: user.email, userId: user._id}, 'secret_will_be_longer', {expiresIn: '1h'});
      
      res.status(200).json({
        message: 'Auth Ok!',
        token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

module.exports = router;