const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
// dg23kdr*

app.use("/api/posts", postsRoutes);

module.exports = app;