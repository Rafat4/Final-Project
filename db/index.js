const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ReefoDB");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("database is connected");
});

//================= User =========================
let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  gender: Number,
  age: String,
  bio: String
});

let User = mongoose.model("User", userSchema);

let addUser = data => {
  var user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    gender: data.gender,
    age: data.age,
    bio: data.bio
  });
  user.save();

  return true;
};
//==================/ user========================

//================= Post =========================
let postSchema = mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdDate: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "PostLike" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "PostComment" }]
});

let Post = mongoose.model("Post", postSchema);

let addPost = data => {
  var post = new Post({
    title: data.title,
    content: data.content,
    user: data.user
  });
  post.save();

  return post;
};
//================== /Post ========================

//================= PostLikes =========================
let postLikeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
});

let PostLike = mongoose.model("PostLike", postLikeSchema);

let likePost = data => {
  var postLike = new PostLike({
    user: data.user,
    post: data.post
  });
  postLike.save(function(err) {
    Post.findById(data.post).then(function(post) {
      post.likes.push(postLike);
      var upsertData = post.toObject();
      delete upsertData._id;
      Post.updateOne({ _id: data.post }, upsertData, {
        multi: false
      }).then(post => {});
    });
    return postLike;
  });
};
//=================== /PostLike =======================

//================== Comments ========================
let postCommentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
});

let PostComment = mongoose.model("PostComment", postCommentSchema);

let addComment = data => {
  var postComment = new PostComment({
    user: data.user,
    comment: data.comment,
    post: data.post
  });
  postComment.save(function(err) {
    Post.findById(data.post).then(function(post) {
      post.comments.push(postComment);
      var upsertData = post.toObject();
      delete upsertData._id;
      Post.updateOne({ _id: data.post }, upsertData, {
        multi: false
      }).then(post => {});
    });
  });
  return postComment;
};
//================== /Comments ========================

module.exports.User = User;
module.exports.addUser = addUser;

module.exports.Post = Post;
module.exports.addPost = addPost;

module.exports.PostLike = PostLike;
module.exports.likePost = likePost;

module.exports.PostComment = PostComment;
module.exports.addComment = addComment;
