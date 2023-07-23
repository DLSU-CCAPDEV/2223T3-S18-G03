/*
    This script creates the database
    and inserts 5 comment comments in the collection `comments`
*/

// import module from `./models/db.js`
const db = require('./models/db.js');

/*
    name of the collection (table)
    to perform CRUD (Create, Read, Update, Delete) operations
*/
const collection = 'comments';

/*
    calls the function createDatabase()
    defined in the `database` object in `./models/db.js`
*/
db.createDatabase();

/*
    creates an object
*/
var commentSchema = {
    comment: 'ano daw',
    commentId: '1',
	postId: '3',
	commenterId: '1'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) `comments`
*/
db.insertOne(collection, commentSchema);

/*
    creates an object
*/
var commentSchema = {
    comment: 'WAT',
    commentId: '2',
	postId: '1',
	commenterId: '2'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) `comments`
*/
db.insertOne(collection, commentSchema);

/*
    creates an object
*/
var commentSchema = {
    comment: 'bruh moment',
    commentId: '3',
	postId: '4',
	commenterId: '3'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) ` `
*/
db.insertOne(collection, commentSchema);

/*
    creates an object
*/
var commentSchema = {
    comment: 'xdd',
    commentId: '4',
	postId: '2',
	commenterId: '4'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) `comments`
*/
db.insertOne(collection, commentSchema);

/*
    creates an object
*/
var commentSchema = {
    comment: 'WOW',
    commentId: '5',
	postId: '1',
	commenterId: '5'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) `comments`
*/
db.insertOne(collection, commentSchema);


