/*
    This script creates the database, 5 comments, 5 users, and 5 posts
*/

// import module from `./models/db.js`
const db = require('./models/db.js');
var fs = require('fs');

/*
    name of the collection (table)
    to perform CRUD (Create, Read, Update, Delete) operations
*/
const {User, Post, Comment} = require('./models/content_db.js');

/*
    calls the function createDatabase()
    defined in the `database` object in `./models/db.js`
*/

populate();

async function populate(){


await db.connect();


////////////////////////////////////////////////////////////////////////////////////


/*
    creates an object
*/
var userNew = {
    username: 'Anyalover69',
    pw: '123123',
    bio: `anya anya anya`,
    dp:{
        data: 1,
        contentType: '',
    },
	userId: 90000001,
};

userNew.dp.data = fs.readFileSync('./public/images/prof_pics/anya.jpg');
userNew.dp.contentType = 'image/jpg';
/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
await db.insertOne(User, userNew);

/*
    creates an object
*/
var userNew = {
    username: 'dankmeemer',
    pw: '8700',
    bio: `XDXDXD MEMER!!!`,
    dp:{
        data: 1,
        contentType: '',
    },
	userId: 90000002,
};

userNew.dp.data = fs.readFileSync('./public/images/prof_pics/lmao.jpg')
userNew.dp.contentType = 'image/jpg';

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
await db.insertOne(User, userNew);

/*
    creates an object
*/
var userNew = {
    username: 'totallynotacatfish',
    pw: 'catgirl123',
    bio: `meow uwu`,
    dp:{
        data: 1,
        contentType: '',
    },
	userId: 90000003,
};

userNew.dp.data = fs.readFileSync('./public/images/prof_pics/egril.jpg')
userNew.dp.contentType = 'image/jpg';

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
await db.insertOne(User, userNew);

/*
    creates an object
*/
var userNew = {
    username: 'HighTierHuman',
    pw: 'ALPHAMALE',
    bio: `GRAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH`,
    dp:{
        data: 1,
        contentType: '',
    },
	userId: 90000004,
};

userNew.dp.data = fs.readFileSync('./public/images/prof_pics/ltg.jpg')
userNew.dp.contentType = 'image/jpg';
/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
await db.insertOne(User, userNew);

/*
    creates an object
*/
var userNew = {
    username: 'Trick1G',
    pw: 'ILOVELEAGUE',
    bio: `LEAGUE PLAYER`,
    dp:{
        data: 1,
        contentType: '',
    },
	userId: 90000005,
};

userNew.dp.data = fs.readFileSync('./public/images/prof_pics/trick.jpg')
userNew.dp.contentType = 'image/jpg';

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `profiles`
*/
await db.insertOne(User, userNew);


////////////////////////////////////////////////////////////////////////////////////


/*
    creates an object
*/
var postNew = {
    title: 'Wtf is wrong with Spy X Family',
    content: 'When Anya received her first bolt, Henderson had stated that violence automatically gets 3 bolts. But, because of him, it was only 1. It doesnt change the fact that “Violence = 3 bolt”... But, what about that time she saved Ken? She saved a literally life. Loosing a life is more major, than a swollen cheek. (No hate. I love Damian.) Punching Damian for no justified reason would have cost her 3 bolts. But, saving the life of a drowning boy was only worth 1 Stella?',
	score: 6345,
    postId: 9000000000000001,
	posterId: 90000001,
    postDate: new Date("2022-03-24"),
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
await db.insertOne(Post, postNew);

/*
    creates an object
*/
var postNew = {
    title: 'Ambatukam',
    content: 'Dreamybulls real name is Perrell Laquarius Brown and he lives in North Carolina where he has a wife and two kids. He was born in 1992, making him 30 years old as of 2022.',
	score: 2344,
    postId: 9000000000000002,
	posterId: 90000002,
    postDate: new Date("2022-03-23"),
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
db.insertOne(Post, postNew);
/*
    creates an object
*/
var postNew = {
    title: 'looking for pro ADC duo in LoL',
    content: 'need an adc player (atleast Challenger) to boost me to diamond in league of legends please. i am bronze IV right now but its because my adc is always bad. i will meow for you everytime you get a kill. uWu',
	score: 443,
    postId: 9000000000000003,
	posterId: 90000003,
    postDate: new Date("2022-03-22"),
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
await db.insertOne(Post, postNew);

/*
    creates an object
*/
var postNew = {
    title: 'You should exercise NOW!',
    content: 'Regular exercise has been shown to help boost energy levels and enhance your mood',
	score: 932,
    postId: 9000000000000004,
	posterId: 90000004,
    postDate: new Date("2022-03-21"),
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
await db.insertOne(Post, postNew);

/*
    creates an object
*/
var postNew = {
    title: 'Test Post #69',
    content: 'test',
	score: 3123,
    postId: 9000000000000005,
	posterId: 90000005,
    postDate: new Date("2022-03-20"),
};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `user` in the collection (table) `posts`
*/
await db.insertOne(Post, postNew);



////////////////////////////////////////////////////////////////////////////////////


/*
    creates an object
*/
var commentNew = {
    comment: 'ano daw',
    commentId: 9000000000000001,
    score: 234,
	postId: 9000000000000003,
	commenterId: 90000001,

};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) `comments`
*/
await db.insertOne(Comment, commentNew);

/*
    creates an object
*/
var commentNew = {
    comment: 'WAT',
    commentId: 9000000000000002,
    score: 3,
	postId: 9000000000000001,
	commenterId: 90000002,

};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) `comments`
*/
await db.insertOne(Comment, commentNew);

/*
    creates an object
*/
var commentNew = {
    comment: 'bruh moment',
    commentId: 9000000000000003,
    score: 877,
	postId: 9000000000000004,
	commenterId: 90000003,

};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) ` `
*/
await db.insertOne(Comment, commentNew);

/*
    creates an object
*/
var commentNew = {
    comment: 'xdd',
    commentId: 9000000000000004,
    score: 5,
	postId: 9000000000000002,
	commenterId: 90000004,

};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) `comments`
*/
await db.insertOne(Comment, commentNew);

/*
    creates an object
*/
var commentNew = {
    comment: 'WOW',
    commentId: 9000000000000005,
    score: 2,
	postId: 9000000000000001,
	commenterId: 90000005,

};

/*
    calls the function insertOne()
    defined in the `database` object in `./models/db.js`
    stores the object `comment` in the collection (table) `comments`
*/
await db.insertOne(Comment, commentNew);

}

