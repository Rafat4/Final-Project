require("dotenv").config({ path: "variables.env" });
const express = require("express");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");
var bodyParser = require("body-parser");
var { addUser, addPost, likePost, addComment } = require("../db/index");

let app = express();
const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:300895a8-5720-48ed-bbfc-aa605e9202a0", //process.env.CHATKIT_INSTANCE_LOCATOR,
  key:
    "661f4c9d-fb34-4d27-9389-9949b374ab22:qGf5qoxb4XjQGFt5GZ7ExzKSn7CsiQ0YV8lPfS7nAWM=" //process.env.CHATKIT_SECRET_KEY,
});
app.use(cors());
const db = require("../db/index.js");
// const github = require('../helpers/github.js');
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../src/index.js"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//=========================chatkit=============================
app.post("/users", (req, res) => {
  let username = req.body.username;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => {
      console.log(username + " successfully connected");
      res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === "services/chatkit/user_already_exists") {
        console.log("exists");
        res.sendStatus(200);
      } else {
        console.log(err.status, err);
        res.status(err.status).json(err);
      }
    });
});

app.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
  //console.log(authData.status, authData.body);
  res.status(authData.status).send(authData.body);
});

//======================users=================================
app.post("/signup", function(req, res) {
  let result = addUser(req.body);
  res.send(result);
});

app.post("/editProfile", function(req, res) {
  var _user = new db.User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    age: req.body.age,
    bio: req.body.bio
  });

  var upsertData = _user.toObject();

  delete upsertData._id;

  db.User.updateOne({ _id: req.body._id }, upsertData, { multi: false }).then(
    function(result) {
      if (result.nModified == 1) {
        res.send(_user);
      } else {
        res.send(false);
      }
    }
  );
});

app.post("/signin", function(req, res) {
  //Check if user exists in the database
  const email = req.body.email;
  const password = req.body.password;

  db.User.findOne({ email: email, password: password }).then(function(user) {
    if (user) {
      res.send(user);
    } else {
      res.send(null);
    }
  });
});
//users

//=======================posts
app.post("/addPost", function(req, res) {
  let result = addPost(req.body);
  res.send(result);
});

app.post("/getAllPosts", function(req, res) {
  var query = {};
  if (req.body.userId) {
    query.user = req.body.userId;
  }
  if (req.body.searchText) {
    query.$and = [
      {
        $or: [
          { title: new RegExp(".*" + req.body.searchText + ".*") },
          { content: new RegExp(".*" + req.body.searchText + ".*") }
        ]
      }
    ];
    // query.title = new RegExp('.*' + req.body.searchText + '.*');
    // query.content = new RegExp('.*' + req.body.searchText + '.*');
  }

  db.Post.find(query)
    .populate("user")
    .populate({ path: "likes", populate: { path: "user" } })
    .populate({ path: "comments", populate: { path: "user" } })
    .sort({ createdDate: "desc" })
    .exec(function(err, posts) {
      res.send(posts);
    });
});

//delete posts
app.post("/deletePost", function(req, res) {
  db.Post.deleteOne({ _id: req._id }).then(function(post) {
    res.send(post);
  });
});

app.post("/likePost", function(req, res) {
  let result = likePost(req.body);
  res.send(result);
});

//delete postLike
app.post("/deleteLike", function(req, res) {
  db.PostLike.deleteOne({ _id: req._id }).then(function(postLiek) {
    res.send(postLiek);
  });
});

app.post("/addComment", function(req, res) {
  let result = addComment(req.body);
  res.send(result);
});
//posts

//user profile
app.post("/getUserProfile", function(req, res) {
  db.User.findById(req.body.user).then(function(user) {
    res.send(user);
  });
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
