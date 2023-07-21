/*
    This script creates the database
    and inserts 5 user posts in the collection `posts`
*/

// import module from `./models/db.js`
const db = require('./models/db.js');

/*
    name of the collection (table)
    to perform CRUD (Create, Read, Update, Delete) operations
*/
const collection = 'posts';

/*
    calls the function createDatabase()
    defined in the `database` object in `./models/db.js`
*/
db.createDatabase();

/*
    creates an object
*/
var postSchema = {
    title: 'Wtf is wrong with Spy X Family',
    content: 'When Anya received her first bolt, Henderson had stated that violence automatically gets 3 bolts. But, because of him, it was only 1. It doesnt change the fact that “Violence = 3 bolt”... But, what about that time she saved Ken? She saved a literally life. Loosing a life is more major, than a swollen cheek. (No hate. I love Damian.) Punching Damian for no justified reason would have cost her 3 bolts. But, saving the life of a drowning boy was only worth 1 Stella?',
	postId: '1',
	posterId: '1'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
db.insertOne(collection, postSchema);

/*
    creates an object
*/
var postSchema = {
    title: 'Ambatukam',
    content: 'Dreamybulls real name is Perrell Laquarius Brown and he lives in North Carolina where he has a wife and two kids. He was born in 1992, making him 30 years old as of 2022.',
	postId: '2',
	posterId: '2'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
db.insertOne(collection, postSchema);

/*
    creates an object
*/
var postSchema = {
    title: 'looking for pro ADC duo in LoL',
    content: 'need an adc player (atleast Challenger) to boost me to diamond in league of legends please. i am bronze IV right now but its because my adc is always bad. i will meow for you everytime you get a kill. uWu',
	postId: '3',
	posterId: '3'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
db.insertOne(collection, postSchema);

/*
    creates an object
*/
var postSchema = {
    title: 'You should exercise NOW!',
    content: 'Regular exercise has been shown to help boost energy levels and enhance your mood',
	postId: '4',
	posterId: '4'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
db.insertOne(collection, postSchema);

/*
    creates an object
*/
var postSchema = {
    title: 'Test Post #69',
    content: 'test',
	postId: '5',
	posterId: '5'
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
db.insertOne(collection, postSchema);


