const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRouts = require('./routes/posts');

const app = express();
mongoose.connect("mongodb+srv://alex:dg23jrdh4kdr@cluster0-bviru.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected~!")
  })
  .catch(err => {
    console.log('Fail!', err);
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Accept");
  next();
})

app.use("/api/posts", postsRouts);

module.exports = app;