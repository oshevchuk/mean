const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.setHeader('Acces-Control-Allow-Methods', '*')
  res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-Type", "application/json")
  next();
});
// dg23kdr*
// mongodb+srv://max:<PASSWORD>@cluster0-bviru.mongodb.net/test?retryWrites=true
app.post('/api/posts',(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'post added'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'post ok',
      posts: documents// .map(item => {id})
    });
  });
});

app.delete("api/posts/:id", (req, res, next) => {
  console.log(res.params.id);
  res.status(200).json({message: 'post deleted'});
});

module.exports = app;