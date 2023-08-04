// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for forum users
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    pw: {
        type: String,
        required: true
    },
    dp: {
        data: Buffer,
        contentType: String,
    },
    bio: {
        type: String,
    },
    userId: {
        type: Number,
        required: true
    },
    upvoted: {
        type: Array,
    },
    downvoted: {
        type: Array,
    }
});


// defines the schema for forum posts
var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    postId: {
        type: Number,
        required: true
    },
    posterId: {
        type: Number,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    },
    isEdited:{
        type: Boolean
    },
    editDate:{
        type: Date,
    },
});

// defines the schema for forum comments
var commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    commentId: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    postId: {
        type: Number,
        required: true
    },
    commenterId: {
        type: Number,
        required: true
    },
    parentId:{
        type: Number,
        required: true
    },
    commentDate: {
        type: Date,
    },
    isEdited:{
        type: Boolean
    },
    editDate:{
        type: Date,
    },
});

var loggerSchema = new mongoose.Schema({
    loggedIn: {
        type: Boolean,
        required: true
    },
    loggeduserId: {
        type: Number,
        required: true
    }
});
/*
    exports a mongoose.models object based on `userSchema`, `postSchema`, and `commentSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
const User = mongoose.model('User', userSchema);            // Automatically creates collection called "users" in database
const Post = mongoose.model('Post', postSchema);            // Automatically creates collection called "posts" in database
const Comment = mongoose.model('Comment', commentSchema);   // Automatically creates collection called "comments" in database
const Logger = mongoose.model('Logger', loggerSchema);   // Automatically creates collection called "comments" in databas
module.exports = { User, Post, Comment, Logger };
