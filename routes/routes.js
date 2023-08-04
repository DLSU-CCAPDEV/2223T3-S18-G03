
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');
const addPostcontroller = require('../controllers/addPostcontroller.js');
const userAccountcontroller = require('../controllers/userAccountcontroller.js');
const addCommentcontroller = require('../controllers/addCommentcontroller.js');

const app = express();

/*
    execute function getFavicon()
    defined in object `controller` in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/favicon.ico`
*/
app.get('/favicon.ico', controller.getFavicon);

/*
    execute function getIndex()
    defined in object `controller` in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/`
*/

app.get('/', controller.getIndex);
//app.post('/', controller.sortIndex);

app.get('/login', controller.redirectLogin);
app.get('/register', controller.redirectRegister);
app.get('/post', controller.getExpandedPost);
app.get('/create', controller.redirectCreatePost);
app.get('/profile', controller.redirectProfile);
// app.post('/createprofile', controller.createProfile);        Not yet implemented
app.get('/getUser', controller.getUser);
app.get('/profile', controller.redirectProfile);
app.get('/updateProfile', controller.updateProfile);

app.get('/createpost', addPostcontroller.getAdd);   // Redirect to Create Post page
app.post('/createpost', addPostcontroller.postAdd); // Creates a post
app.get('/editpost', addPostcontroller.postEdit);   // Redirect to edit page
app.post('/editpost', addPostcontroller.postEditsaved); // Edits the post frfr

app.get('/editcomment', addPostcontroller.commEdit);   // Redirect to edit page
app.post('/editcomment', addPostcontroller.commEditsaved); // Edits the post frfr
app.post('/deletecomment', addPostcontroller.getCommDelete);

app.post('/post', addCommentcontroller.commentAdd);

app.get('/login', userAccountcontroller.getLogin);  // Redirect to login page
app.post('/login', userAccountcontroller.postLogin); // Login user
app.get('/logout', userAccountcontroller.logOut)    // Log out user

app.get('/register', userAccountcontroller.getRegister);  // Redirect to login page
app.post('/register', userAccountcontroller.postRegister); // Register user (and log them in)

app.get('/results', controller.getSearchPosts);

app.get('/vote', controller.getVote);
app.post('/delete', controller.getDelete);

app.post('/downvote', controller.downvote);
app.post('/upvote', controller.upvote);

module.exports = app;