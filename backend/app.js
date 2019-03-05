const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb+srv://alex:dg23jrd@cluster0-bviru.mongodb.net/test?retryWrites=true")
// mongoose.connect("mongodb+srv://max:QuBqs0T45GDKPlIG@cluster0-ntrwp.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
    console.log('connected');
  })
  .catch(() => {
    console.log('error');
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Acces-Control-Allow-Methods', '*')
//   // res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Content-Type", "application/json")
//   next();
// });
// dg23kdr*
// mongodb+srv://max:<PASSWORD>@cluster0-bviru.mongodb.net/test?retryWrites=true


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
        );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
    next();
});

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
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(res => {
    res.status(200).json({message: 'post deleted'});
  });  
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: 'succes'});
  });
});

app.get("api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {

    } else {
      res.status(404).json({message: 'not found'});
    }
  });
});

module.exports = app;