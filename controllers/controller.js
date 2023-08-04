const mongoose = require("mongoose");
//mongoose.connect('mongodb://127.0.0.1/Kahit-Ano');  // Connect to database
const connection = mongoose.connection;             // Store database as a variable
const db = require('../models/db.js');
const {Post, Comment, User} = require('../models/content_db.js');
//var logger = require('../logger.json');              // Get logged in condition
/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const controller = {

    /*
        executed when the client sends an HTTP GET request `/favicon.ico`
        as defined in `../routes/routes.js`
    */
    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
        executed when the client sends an HTTP GET request `/`
        as defined in `../routes/routes.js`
        loads Homepage
    */
        getIndex: function (req, res) {
            setTimeout(async () => {

                
                let postcoll = connection.db.collection("posts");                       // Store the "posts" collection as a variable 
                let usercoll = connection.db.collection("users");                       // Store the "user" collection as a variable 
                let commcoll = connection.db.collection("comments");                       // Store the "comments" collection as a variable 


                var AllPosts;

                if(req.query.sorted === "oldest" ) AllPosts = await postcoll.find({}, {sort:{postDate:1}}).toArray(); // -1 Sorts posts from newest to oldest order as an array, store it in AllPosts
                else if(req.query.sorted === "best" ) AllPosts = await postcoll.find({}, {sort:{score:-1}}).toArray(); 
                else AllPosts = await postcoll.find({}, {sort:{postDate:-1}}).toArray(); // -1 Sorts posts from newest to oldest order as an array, store it in AllPosts
                
                
                //let AllPosts = await postcoll.find({}, {sort:{postDate:-1}}).toArray(); // -1 Sorts posts from newest to oldest order as an array, store it in AllPosts
                for (const post of AllPosts){                                           // For each post...
                    let founduser = await usercoll.findOne({'userId': post.posterId});  // Find a userId that matches the post's posterId, returns the user
                    post.postUsername = founduser.username;                             // Attach a postUsername attribute to the post for rendering purposes only (does not appear in database)
                    post.dpType = founduser.dp.contentType;                             // Attach a dpType attribute to the post for rendering purposes only (does not appear in database)
                    post.dpBuffer = founduser.dp.data.toString('base64');               // Attach a dpBuffer attribute to the post for rendering purposes only (does not appear in database)
                    
                    post.commentnum = (await commcoll.find({'postId':post.postId}, {sort:{score:-1}}).toArray()).length; 
                    
                    var endDate = new Date();
                    var startDate = post.postDate;
                    var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
                    post.span= TimeCalculator(interval)
                    
                    if(post.isEdited){ // Adds "Commented 34 minutes ago, etc."
                        var endDate = new Date();
                        var startDate = post.editDate;
                        var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
                        post.editSpan= TimeCalculator(interval)     
                    }
                    
                    /* If post is edited, do this
                    if(post.posterId === req.session.userId){
                        post.delete = '<p class="post_options" style="margin-right:-8px; font-style:italic"> Edited </p>';
                    }else   post.delete = '<div> </div>';
                    */
                }
    
                // The following 3 lines might be useful for rendering the 'Header' partial everywhere
                var loggeduser;
                if(req.session.userId){
                    loggeduser = await usercoll.findOne({'userId': req.session.userId})    // Find a userId that matches the logged user's Id, returns the user
                    loggeduser.loggedIn = true;                                     // Attach logger data to loggeduser (for rendering in hbs)
                    loggeduser.dpBuffer = loggeduser.dp.data.toString('base64');                // Attach dp data to loggeduser (for rendering in hbs)
                }
                
                let usercount = (await postcoll.find({}, {sort:{postDate:-1}}).toArray()).length; 
                let commcount = (await commcoll.find({}, {sort:{postDate:-1}}).toArray()).length; 
                let postcount = AllPosts.length;

                let stats={
                    usercount: usercount,
                    postcount: postcount,
                    commcount: commcount,
                }
                
                res.render('Home', { AllPosts, loggeduser, stats });                               // render `../views/Home.hbs with posts from database and the logged in user`
            }, 100);
        },




    redirectLogin: function (req, res) {
        res.render('Login');
    },
    redirectRegister: function (req, res) {
        res.render('Register');
    },
    redirectCreatePost: function (req, res) {
        res.render('Create');
    },
    redirectProfile: function (req, res) {
        setTimeout(async () => {
            let userId = req.query.id;      // userId parameter when entering profile page (/profile?id=0000)

            // inserting database into function
            let postcoll = connection.db.collection("posts");
            let usercoll = connection.db.collection("users");
            let commcoll = connection.db.collection("comments");

            // collecting data associated with userId
            let user = await usercoll.findOne({'userId': userId});
            // error handler if the user is not found -- (testing)
            if (!user) {
                res.render('error', {error: 'user not found'});
            }

            let post = await postcoll.findOne({'posterId': userId});
            let comment = await commcoll.findOne({'posterId': userId});

            // inserting user values into post
            let posts = await postcoll.find({'userId': userId}, {sort:{postDate:1}}).toArray();

            for (const post of posts){                                              // For each post...
                let founduser = await usercoll.findOne({'userId': post.posterId});  // Find a userId that matches the post's posterId, returns the user
                post.postUsername = founduser.username;                             // Attach a postUsername attribute to the post for rendering purposes only (does not appear in database)
                post.dpType = founduser.dp.contentType;                             // Attach a dpType attribute to the post for rendering purposes only (does not appear in database)
                post.dpBuffer = founduser.dp.data.toString('base64');               // Attach a dpBuffer attribute to the post for rendering purposes only (does not appear in database)
                
                post.commentnum = (await commcoll.find({'postId':post.postId}, {sort:{score:-1}}).toArray()).length; 
                
                var endDate = new Date();
                var startDate = post.postDate;
                var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
                post.span= TimeCalculator(interval);
                
                if(post.isEdited){ // Adds "Commented 34 minutes ago, etc."
                    var endDate = new Date();
                    var startDate = post.editDate;
                    var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
                    post.editSpan= TimeCalculator(interval);     
                }
            }

            loggeduser = await usercoll.findOne({'userId': req.session.userId});


            // creating variables for count statistics
            let countPost = post.length;
            let countComment = comment.length;
            let stat = {countPost, countComment}

            res.render('Profile', {user, posts, stat, loggeduser});

        }, 100);
    },

    getExpandedPost: function (req, res) {
        setTimeout(async () => {
            let postcoll = connection.db.collection("posts");
            let usercoll = connection.db.collection("users");
            let commcoll = connection.db.collection("comments");
            let id = parseInt(req.query.id);
            let post = await postcoll.findOne({'postId': id});
            let user = await usercoll.findOne({'userId': post.posterId});
            post.poster = user.username;
            post.dpType = user.dp.contentType;
            post.dpBuffer = user.dp.data.toString('base64');
            


            
            var endDate = new Date();
            var startDate = post.postDate;
            var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
            post.span= TimeCalculator(interval)     

            //var comments = await commcoll.find({'postId': id}).toArray();

                    if(post.posterId === req.session.userId){ // Adds edit and delete icons if poster is the post
                        post.delete = '<div class="delete_icon" style="margin-left:15px"> </div><div class="post_options" style=" font-weight:100">Delete your post </div>';
                        post.edit = `<a href="/editpost?id=${post.postId}"><div class="edit_icon"></div></a><div class="post_options" style=" font-weight:100"> Edit your post</div>`;
                    }else {
                        post.delete = '<div> </div>';
                        post.edit = '<div> </div>';
                    }

            // For rendering navbar
            var loggeduser;
            if(req.session.userId){
                loggeduser = await usercoll.findOne({'userId': req.session.userId})    // Find a userId that matches the logged user's Id, returns the user
                loggeduser.loggedIn = true;                                     // Attach logger data to loggeduser (for rendering in hbs)
                loggeduser.dpBuffer = loggeduser.dp.data.toString('base64');                // Attach dp data to loggeduser (for rendering in hbs)
            
            
            }

            var downindex = loggeduser.downvoted.indexOf(post.postId);
            var upindex = loggeduser.upvoted.indexOf(post.postId);

            if(downindex !== -1) post.down = "active"; // If user has downvoted this already..
            if(upindex !== -1) post.up = "active";       // If user has upvoted this already..

            
            var comments = await commcoll.find({'postId': id, 'parentId': 0}).toArray();
            for(var i=0; i<comments.length; i++){
                comments[i].indent = 0;
            }
            for(var i=0; i<comments.length; i++){
                replies = await commcoll.find({'postId': id, 'parentId': comments[i].commentId}).toArray();
                if (replies.length > 0){
                    for(var reply of replies){
                        reply.indent = comments[i].indent + 40;
                    }
                }
                comments.splice(i+1, 0, ...replies);
            }

            console.log(comments);
            for (const comment of comments){
                var downindex = loggeduser.downvoted.indexOf(comment.commentId);
                var upindex = loggeduser.upvoted.indexOf(comment.commentId);

                if(downindex !== -1) comment.down = "active"; // If user has downvoted this already..
                if(upindex !== -1) comment.up = "active";       // If user has upvoted this already..

                let founduser = await usercoll.findOne({'userId': comment.commenterId});
                if(req.session.userId) comment.loggedIn = true;
                comment.postUsername = founduser.username;
                comment.dpType = founduser.dp.contentType;
                comment.dpBuffer = founduser.dp.data.toString('base64');
                if(comment.commentDate){ // Adds "Commented 34 minutes ago, etc."
                    var endDate = new Date();
                    var startDate = comment.commentDate;
                    var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
                    comment.span= TimeCalculator(interval)     
                }
            }

            if(post.isEdited){ // Adds "Edited 34 minutes ago, etc."
                var endDate = new Date();
                var startDate = post.editDate;
                var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
                post.editSpan= TimeCalculator(interval)     
            }

            res.render('Expanded Post', {post, comments, loggeduser });
        }, 100);
    },

    /*
        for adding new posts
    */
        getAdd: function (req, res) {
            var title = req.query.title;
            var content = req.query.content;
            var vote = 0;
            var postDate = new Date();
            // postID
            // posterID
    
            // TODO: insert missing postID and posterID values
            db.insertOne(Post, {title: title, content: content, vote: vote, postDate: postDate}, function(flag){
                res.render('partials/Post-body', {title: title, content: content, vote: vote, postDate: postDate}, function (err, html){
                    res.send(html);
                    // NOTE: unsure if the post will appear at the top of the homepage or at the very end
                    // based on the sample repo used as reference, it appears to be appeneded at the very end
                })
            })
        },
        
        getLogin: function(req, res) {
            res.render('Login');
        },

        getSearchPosts: function (req, res) {
            setTimeout(async () => {
                
                // The following 3 lines might be useful for rendering the 'Header' partial everywhere
                var loggeduser;


                let postcoll = connection.db.collection("posts");                       // Store the "posts" collection as a variable 
                let usercoll = connection.db.collection("users");                       // Store the "user" collection as a variable 
                let commcoll = connection.db.collection("comments");

                if(req.session.userId){
                    loggeduser = await usercoll.findOne({'userId': req.session.userId})    // Find a userId that matches the logged user's Id, returns the user
                    loggeduser.loggedIn = true;                                     // Attach logger data to loggeduser (for rendering in hbs)
                    loggeduser.dpBuffer = loggeduser.dp.data.toString('base64');                // Attach dp data to loggeduser (for rendering in hbs)
                }

                var title = req.query.title;
                var query = req.query.query;
                var found = {};
                
                let searchRes = await postcoll.find({'title': query}).toArray();
                if(searchRes){
                    found.attribute = 1;

                }

                let AllPosts = await postcoll.find({'title': query}).toArray();         // -1 Sorts posts from newest to oldest order as an array, store it in AllPosts
                for (const post of AllPosts){                                           // For each post...
                    let founduser = await usercoll.findOne({'userId': post.posterId});  // Find a userId that matches the post's posterId, returns the user
                    post.postUsername = founduser.username;                             // Attach a postUsername attribute to the post for rendering purposes only (does not appear in database)
                    post.dpType = founduser.dp.contentType;                             // Attach a dpType attribute to the post for rendering purposes only (does not appear in database)
                    post.dpBuffer = founduser.dp.data.toString('base64');               // Attach a dpBuffer attribute to the post for rendering purposes only (does not appear in database)

                                        
                    post.commentnum = (await commcoll.find({'postId':post.postId}, {sort:{score:-1}}).toArray()).length; 
                    
                    var endDate = new Date();
                    var startDate = post.postDate;
                    var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
                    post.span= TimeCalculator(interval)
                    
                    if(post.isEdited){ // Adds "Commented 34 minutes ago, etc."
                        var endDate = new Date();
                        var startDate = post.editDate;
                        var interval = (endDate.getTime()-startDate.getTime())/1000; // Shows, 23 minutes ago, etc.
                        post.editSpan= TimeCalculator(interval)     
                    }
                    
                    /* If post is edited, do this
                    if(post.posterId === req.session.userId){
                        post.delete = '<p class="post_options" style="margin-right:-8px; font-style:italic"> Edited </p>';
                    }else   post.delete = '<div> </div>';
                    */

                }
                
                
                res.render('SearchResults', { AllPosts, loggeduser });                               // render ../views/SearchResults.hbs with posts from database and the logged in user
            }, 100);
        },

        getUser: function (req, res) {
            setTimeout(async () => {
                let usercoll = connection.db.collection("users");
                let username = req.params.username;
                let password = req.params.password;

                let result = await usercoll.findOne({username: username, password: password});

                res.send(result);
            }, 100);
        },
        /*
            for deleting a users own posts
        */
            deletePost: function (req, res) {

            },
        /*
            for deleting a users own comments
        */
            deleteComment: function (req, res) {

            },
        /*
            for editing a users own posts
        */
            editPost: function (req, res) {

            },
        /*
            for editing a users own comments
        */
            editComment: function (req, res) {

            },
            
            getVote: function (req, res) {
                setTimeout(async () => {

                }, 100);
            },

            getDelete: function (req, res) {
                setTimeout(async () => {
                    await db.deleteOne(Post,{'postId':req.body.id});
                    await db.deleteMany(Comment,{'postId':req.body.id});
                    res.redirect('/');
                }, 100);

            },

            updateProfile: function (req, res) {
                setTimeout(async () => {
                    let username = req.query.username;
                    let bio = req.query.bio;
                    let userid = req.session.userid;

                    result = await db.updateOne(User, {'userId': userid}, {'username': username, 'bio': bio});
                    res.send(result);
                }, 100);
            },



            upvote: function (req, res) {
                setTimeout(async () => {
                    var change = Number(req.body.change);
                    var id = Number(req.body.id);

                    let commcoll = connection.db.collection("comments");
                    let postcoll = connection.db.collection("posts");
                    let usercoll = connection.db.collection("users");
                    
                    let loggeduser = await usercoll.findOne({'userId': req.session.userId})
                    let post = await postcoll.findOne({'postId': id});
                    let comment = await commcoll.findOne({'commentId': id});




                    var newUparray = [];
                    if(loggeduser.upvoted) newUparray = loggeduser.upvoted;

                    var newDownarray = [];
                    if(loggeduser.downvoted) newDownarray = loggeduser.downvoted;

                    if(post)
                    {
                        var newscore = post.score+change;
                        switch(change){
                            case -1:
                                var index = newUparray.indexOf(id);
                                newUparray.splice(index,1);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    upvoted: newUparray
                                });
                                break;
                            case 1:
                                newUparray.push(id);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    upvoted: newUparray
                                });
                                break;
                            case 2:
                                newUparray.push(id);
                                var index = newDownarray.indexOf(id);
                                newDownarray.splice(index,1);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    upvoted: newUparray,
                                    downvoted: newDownarray
                                });
                                break;
                        }

                        await db.updateOne(Post,{'postId':id},
                        {
                            score: newscore
                        });
                    }
                    else if(comment)
                    {
                        var newscore = comment.score+change;
                        switch(change){
                            case -1:
                                var index = newUparray.indexOf(id);
                                newUparray.splice(index,1);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    upvoted: newUparray
                                });
                                break;
                            case 1:
                                newUparray.push(id);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    upvoted: newUparray
                                });
                                break;
                            case 2:
                                newUparray.push(id);
                                var index = newDownarray.indexOf(id);
                                newDownarray.splice(index,1);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    upvoted: newUparray,
                                    downvoted: newDownarray
                                });
                                break;
                        }
                        await db.updateOne(Comment,{'commentId':id},
                        {
                            score: newscore
                        });
                    }


                    // Change = -1, remove up, 2: remove down add up, 1: add up
                }, 100);



            },

            
            downvote: function (req, res) {
                setTimeout(async () => {
                    var change = Number(req.body.change);
                    var id = Number(req.body.id);

                    let commcoll = connection.db.collection("comments");
                    let postcoll = connection.db.collection("posts");
                    let usercoll = connection.db.collection("users");
                    
                    let loggeduser = await usercoll.findOne({'userId': req.session.userId})
                    let post = await postcoll.findOne({'postId': id});
                    let comment = await commcoll.findOne({'commentId': id});


                    var newUparray =[];
                    if(loggeduser.upvoted) newUparray = loggeduser.upvoted;

                    var newDownarray =[];
                    if(loggeduser.downvoted) newDownarray = loggeduser.downvoted;

                    if(post)
                    {
                        var newscore = post.score+change;
                        switch(change){
                            case -2:
                                newDownarray.push(id);
                                var index = newUparray.indexOf(id);
                                newUparray.splice(index,1);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    upvoted: newUparray,
                                    downvoted: newDownarray
                                });
                                break;
                            case -1:
                                newDownarray.push(id);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    downvoted: newDownarray
                                });
                                break;
                            case 1:
                                var index = newDownarray.indexOf(id);
                                newDownarray.splice(index,1);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    downvoted: newDownarray
                                });
                                break;
                        }

                        await db.updateOne(Post,{'postId':id},
                        {
                            score: newscore
                        });
                    }
                    else if(comment)
                    {
                        var newscore = comment.score+change;
                        switch(change){
                            case -2:
                                newDownarray.push(id);
                                var index = newUparray.indexOf(id);
                                newUparray.splice(index,1);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    upvoted: newUparray,
                                    downvoted: newDownarray
                                });
                                break;
                            case -1:
                                newDownarray.push(id);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    downvoted: newDownarray
                                });
                                break;
                            case 1:
                                var index = newDownarray.indexOf(id);
                                newDownarray.splice(index,1);
                                await db.updateOne(User,{'userId': req.session.userId},
                                {
                                    downvoted: newDownarray
                                });
                                break;
                        }
                        await db.updateOne(Comment,{'commentId':id},
                        {
                            score: newscore
                        });
                    }
                    // Change = 1, remove down, -2: remove up add down, -1: add down
                }, 100);





            },
}


/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = controller;

// Helper function to convert seconds to a date
function TimeCalculator(seconds) {
    let y = Math.floor(seconds / 31536000);
    let mo = Math.floor((seconds % 31536000) / 2628000);
    let d = Math.floor(((seconds % 31536000) % 2628000) / 86400);
    let h = Math.floor((seconds % (3600 * 24)) / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);
    var yDisplay;
    var moDisplay;
    var dDisplay;
    var hDisplay;
    var mDisplay;
    var sDisplay;

    if(y) {
        yDisplay = y > 0 ? y + (y === 1 ? " year " : " years ") : "";
        return yDisplay+" ago";
    }
    else if(mo) {
        moDisplay = mo > 0 ? mo + (mo === 1 ? " month " : " months ") : "";
        return moDisplay + " ago";
    }
    else if(d) {
        dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
        return dDisplay + " ago";
    }
    else if(h) {
        hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
        return hDisplay + mDisplay + " ago";
    }
    else if(m) {
        mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
        return mDisplay + " ago";
    }
    else return "just recently";
    //else if(s) sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds ") : "";
    //return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay + " ago";
  }