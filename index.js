
// import module `express`
const express = require('express');

// import module `hbs`
const hbs = require('hbs');

// import module `express-session`
const session = require('express-session');

// import module `mongoose`
const mongoose = require('mongoose');

// import module `connect-mongo`
const MongoStore = require('connect-mongo')(session);

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
const port = 9090;
const host = '0.0.0.0';

// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({limit: '50mb', extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));


// connects to the database
db.connect();

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
app.use(session({
    'secret': 'kahit-ano',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

app.use(function (req, res) {

    res.render('error');

});

// binds the server to a specific port
app.listen(port, host, function () {
    console.log(`Kahit-Ano now running at: http://localhost:${port}`);
});
