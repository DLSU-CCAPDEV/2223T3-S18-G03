/*
    This script creates the database
    and inserts 5 user details in the collection `profiles`
*/

// import module from `./models/db.js`
const db = require('./models/db.js');

/*
    name of the collection (table)
    to perform CRUD (Create, Read, Update, Delete) operations
*/
const collection = 'profiles';

/*
    calls the function createDatabase()
    defined in the `database` object in `./models/db.js`
*/
db.createDatabase();

/*
    creates an object
*/
var userSchema = {
    username: 'Anyalover69',
    pw: '123123',
    dp: 'anya.jpg',
    bio: `anya anya anya`,
	commenterId: '1',
	posterId: '1'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
db.insertOne(collection, userSchema);

/*
    creates an object
*/
var userSchema = {
    username: 'dankmeemer',
    pw: '8700',
    dp: 'lmao.jpg',
    bio: `XDXDXD MEMER!!!`,
	commenterId: '2',
	posterId: '2'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
db.insertOne(collection, userSchema);

/*
    creates an object
*/
var userSchema = {
    username: 'totallynotacatfish',
    pw: 'catgirl123',
    dp: 'egril.jpg"',
    bio: `meow uwu`,
	commenterId: '3',
	posterId: '3'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
db.insertOne(collection, userSchema);

/*
    creates an object
*/
var userSchema = {
    username: 'HighTierHuman',
    pw: 'ALPHAMALE',
    dp: 'ltg.jpg',
    bio: `GRAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH`,
	commenterId: '4',
	posterId: '4'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
db.insertOne(collection, userSchema);

/*
    creates an object
*/
var userSchema = {
    username: 'Trick1G',
    pw: 'ILOVELEAGUE',
    dp: 'trick.jpg',
    bio: `LEAGUE PLAYER`,
	commenterId: '5',
	posterId: '5'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
db.insertOne(collection, userSchema);


