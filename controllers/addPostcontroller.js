const mongoose = require("mongoose");
//mongoose.connect('mongodb://127.0.0.1/Kahit-Ano');  // Connect to database
const connection = mongoose.connection;             // Store database as a variable



const db = require('../models/db.js');

const {Post, Comment, Logger} = require('../models/content_db.js');
//var logger = require('../logger.json');              // Get logged in condition

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const addPostcontroller = {


    /*
        for adding new posts
    */
        postAdd: function (req, res) {
            
            let postcoll = connection.db.collection("posts");     // Store the "post" collection as a variable 

            if(req.body.created_title === null) {
                alert("Please add a Title!"); return;
            }
            if(req.body.created_text === null) {
                alert("Please add some Content!"); return;
            }

            setTimeout(async () => {

                let lastpost = await postcoll.find({}, {limit:1, sort:{postId:-1}}).toArray(); // Returns latest post
                
                var postNew = {
                    title: req.body.created_title,
                    content: req.body.created_text,
                    score: 0,
                    postId: lastpost[0].postId+1,   // Latest post's ID + 1
                    posterId: req.session.userId,
                    postDate: new Date()
                };
                //console.log(postNew);
                await db.insertOne(Post, postNew);  // Then add post to database
                res.redirect('/');                  // Then redirect to home
            }, 50);
        
        },

        getAdd: function (req, res) {   // Redirect to Creating Post page

            if(!req.session.userId) res.redirect('/');

            setTimeout(async () => {

            let usercoll = connection.db.collection("users");                       // Store the "user" collection as a variable 
            // The following 3 lines might be useful for rendering the 'Header' partial everywhere
            let loggeduser = await usercoll.findOne({'userId': req.session.userId})    // Find a userId that matches the logged user's Id, returns the user
            loggeduser.loggedIn = true                                       // Attach logger data to loggeduser (for rendering in hbs)
            loggeduser.dpBuffer = loggeduser.dp.data.toString('base64');                // Attach dp data to loggeduser (for rendering in hbs)

            res.render('Create', { loggeduser });                               // render `../views/Home.hbs with posts from database and the logged in user`
        }, 100);
        },

        postEdit: function (req, res) {   // Redirect to Creating Post page

            if(!req.session.userId) res.redirect('/');

            setTimeout(async () => {
            let postcoll = connection.db.collection("posts");     // Store the "post" collection as a variable 
            let usercoll = connection.db.collection("users");                       // Store the "user" collection as a variable 
            // The following 3 lines might be useful for rendering the 'Header' partial everywhere
            let loggeduser = await usercoll.findOne({'userId': req.session.userId})    // Find a userId that matches the logged user's Id, returns the user
            loggeduser.loggedIn = true                                       // Attach logger data to loggeduser (for rendering in hbs)
            loggeduser.dpBuffer = loggeduser.dp.data.toString('base64');                // Attach dp data to loggeduser (for rendering in hbs)
 
                let postId = parseInt(req.query.id);
                let origpost = await postcoll.findOne({'postId': postId});

                res.render('Edit', {origpost, loggeduser})
                //res.redirect(`/post?id=${id}`);                               // render `../views/Home.hbs with posts from database and the logged in user`
        }, 100);
        },

        postEditsaved: function (req, res) {   // Redirect to Creating Post page
            let postcoll = connection.db.collection("posts");     // Store the "post" collection as a variable 
            let postId = parseInt(req.query.id);
            
            if(req.body.created_title === null) {
                alert("Please add a Title!"); return;
            }
            if(req.body.created_text === null) {
                alert("Please add some Content!"); return;
            }

            setTimeout(async () => {

                await db.updateOne(Post,{'postId':postId},
                {
                    title: req.body.created_title,
                    content:req.body.created_text,
                    isEdited: true,
                    editDate: new Date(),
                })
                
                res.redirect(`/post?id=${postId}`);                  // Then redirect to post
            }, 50);
        },

        commEdit: function (req, res) {   // Redirect to Creating Post page

            if(!req.session.userId) res.redirect('/');
            
            setTimeout(async () => {

            console.log(req.query.id)
            console.log(req.query.postid)
            let postcoll = connection.db.collection("posts");     // Store the "post" collection as a variable 
            let commcoll = connection.db.collection("comments");     // Store the "post" collection as a variable 
            let usercoll = connection.db.collection("users");                       // Store the "user" collection as a variable 
            // The following 3 lines might be useful for rendering the 'Header' partial everywhere
            let loggeduser = await usercoll.findOne({'userId': req.session.userId})    // Find a userId that matches the logged user's Id, returns the user
            loggeduser.loggedIn = true                                       // Attach logger data to loggeduser (for rendering in hbs)
            loggeduser.dpBuffer = loggeduser.dp.data.toString('base64');                // Attach dp data to loggeduser (for rendering in hbs)
 
                let postId = parseInt(req.body.id);
                let origpost = await commcoll.findOne({'commentId': Number(req.query.id)});

                res.render('EditComm', {origpost, loggeduser})
                //res.redirect(`/post?id=${id}`);                               // render `../views/Home.hbs with posts from database and the logged in user`
        }, 100);
        },

        commEditsaved: function (req, res) {   // Redirect to Creating Post page
            
            let commcoll = connection.db.collection("comments");     // Store the "post" collection as a variable 
            let id = parseInt(req.query.id);

            if(req.body.created_title === null) {
                alert("Please add a Title!"); return;
            }
            if(req.body.created_text === null) {
                alert("Please add some Content!"); return;
            }

            setTimeout(async () => {
                
                await db.updateOne(Comment,{'commentId':id},
                {
                    comment:req.body.created_text,
                    isEdited: true,
                    editDate: new Date(),
                })
                
                res.redirect(`/post?id=${req.query.postid}`);                  // Then redirect to post*/
            }, 50);
            
        },

        getCommDelete: function (req, res) {
            setTimeout(async () => {
                await db.deleteOne(Comment,{'commentId':req.body.id});
                //await db.deleteMany(Comment,{'postId':req.body.id});
            }, 100);

        },



    
        
}


/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = addPostcontroller;

