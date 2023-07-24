
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');
const addPostcontroller = require('../controllers/addPostcontroller.js');
const userAccountcontroller = require('../controllers/userAccountcontroller.js');

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

app.get('/login', controller.redirectLogin);
app.get('/register', controller.redirectRegister);
app.get('/post', controller.getExpandedPost);
app.get('/create', controller.redirectCreatePost);
app.get('/profile', controller.redirectProfile);
// app.post('/createprofile', controller.createProfile);        Not yet implemented
app.get('/getUser', controller.getUser);
app.get('/profile', controller.redirectProfile);

app.get('/createpost', addPostcontroller.getAdd);   // Redirect to Create Post page
app.post('/createpost', addPostcontroller.postAdd); // Creates a post

app.get('/login', userAccountcontroller.getLogin);  // Redirect to login page
app.post('/login', userAccountcontroller.postLogin); // Login user
app.get('/logout', userAccountcontroller.logOut)    // Log out user

app.get('/register', userAccountcontroller.getRegister);  // Redirect to login page
app.post('/register', userAccountcontroller.postRegister); // Register user (and log them in)

module.exports = app;