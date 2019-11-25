const express = require('express');
// const bcrypt = require('bcrypt');

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
  User.findOne({email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      return req.body.password === user.password;
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      return res.status(201).json({
        message: 'Auth Ok!'
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

module.exports = router;