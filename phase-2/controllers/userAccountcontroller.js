const mongoose = require("mongoose");
//mongoose.connect('mongodb://127.0.0.1/Kahit-Ano');  // Connect to database
const connection = mongoose.connection;             // Store database as a variable

const {User, Post, Logger} = require('../models/content_db.js');
//var logger = require('../logger.json');              // Get logged in condition

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/db.js');

const fs = require('fs');

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const addPostcontroller = {


    /*
        for registering
    */
        getRegister: function(req,res){
            if(req.session.userId) res.redirect('/');
            else res.render('Register');
        },

        postRegister: function(req,res){

            setTimeout(async () => {
                let usercoll = connection.db.collection("users");     // Store the "user" collection as a variable 
                let lastuser = await usercoll.find({}, { sort:{userId:-1}}).toArray(); // Returns latest post
                if(await usercoll.findOne({'username': req.body.username})){
                    // Username already exists
                    res.render('Register', {error: "Username already exists, try another one!"});
                    return;
                } else if(req.body.password.length < 8){
                        // Not enough characters for password
                        res.render('Register', {error: "Passwords should have atleast 8 characters!"});
                        return;
                }
                    
                    else
                {
                
                var unhashedpass = req.body.password;

                bcrypt.hash(unhashedpass, saltRounds, async function(err,hash){

                    var userNew = {
                        username: req.body.username,
                        pw: hash,
                        bio: "Hello!",
                        dp:{
                            data: 1,
                            contentType: '',
                        },
                        userId: lastuser[0].userId+1,   // Latest post's ID + 1
                    }

                    userNew.dp.data = fs.readFileSync('./public/images/pfp.png')
                    userNew.dp.contentType = 'image/png';

                    await db.insertOne(User, userNew);  // Then add post to database

                    req.session.username = userNew.username;
                    req.session.userId = userNew.userId;
                    res.redirect('/');

                });

                }
                
            }, 100);
        },

        getLogin: function(req,res){
            if(req.session.userId) res.redirect('/');
            else res.render('Login');
        },




        postLogin: function(req,res){
            
            setTimeout(async () => {
                let usercoll = connection.db.collection("users");     // Store the "user" collection as a variable 
                //var legituser =await usercoll.findOne({'username': req.body.username, 'pw':req.body.password})
                
                var legituser =await usercoll.findOne({'username': req.body.username})
                if( legituser) {
                    // User exists
                    
                    bcrypt.compare(req.body.password, legituser.pw, async function(err, equal){

                        if(equal){
                            
                            req.session.username = legituser.username;
                            req.session.userId = legituser.userId;
                            res.redirect('/');
                        }
                        else{
                            res.render('Login', {error: "Your password is incorrect, try again!"});
                        }



                    })
                } else
                {
                    res.render('Login', {error: "That Username does not exist, try again!"});
                    
                    return;
                }
                
            }, 100);





        },

        logOut: function(req,res){
            setTimeout(async () => {

                req.session.destroy(function(err){
                    if(err) throw err;
                    res.redirect('/');
                })

        }, 100);
            //setInterval(res.redirect('/'), 1000);
        },












        postAdd: function (req, res) {

            let usercoll = connection.db.collection("posts");     // Store the "user" collection as a variable 

            if(req.body.created_title === null) {
                alert("Please add a Title!"); return;
            }
            if(req.body.created_text === null) {
                alert("Please add some Content!"); return;
            }

            setTimeout(async () => {
                let lastpost = await usercoll.find({}, {limit:1, sort:{postDate:1}}).toArray(); // Returns latest post
                
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

            setTimeout(async () => {
            
            let usercoll = connection.db.collection("users");                       // Store the "user" collection as a variable 
            // The following 3 lines might be useful for rendering the 'Header' partial everywhere
            let loggeduser = await usercoll.findOne({'userId': req.session.userId})    // Find a userId that matches the logged user's Id, returns the user
            loggeduser.loggedIn = true;                                    // Attach logger data to loggeduser (for rendering in hbs)
            loggeduser.dpBuffer = loggeduser.dp.data.toString('base64');                // Attach dp data to loggeduser (for rendering in hbs)

            res.render('Create', { loggeduser });                               // render `../views/Home.hbs with posts from database and the logged in user`
        }, 100);
        }
    
        
}


/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = addPostcontroller;

