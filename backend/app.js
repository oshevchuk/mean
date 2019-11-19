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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Accept");
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added',
      postId: createdPost._id
    }); 
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(docs => {
    res.status(200).json({
      message: "succes",
      posts: docs
    });
  }).catch(err => {
    console.log('Error', err)
  });  
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(res => {
    res.status(200).json({message: 'Updated!'})
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(reslt => {
    res.status(200).json({message: "Post deleted"});
  });  
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404) .json({message: 'POst not found'});
    }
  });
});

module.exports = app;