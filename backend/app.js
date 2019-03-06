const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();
mongoose.connect("mongodb+srv://alex:dg23jrd@cluster0-bviru.mongodb.net/test?retryWrites=true")
  .then(() => {
    console.log('connected');
  })
  .catch(() => {
    console.log('error');
  });
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