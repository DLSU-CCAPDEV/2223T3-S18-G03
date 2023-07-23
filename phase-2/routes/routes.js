
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');


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

module.exports = app;