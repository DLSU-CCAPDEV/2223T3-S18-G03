const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/Kahit-Ano');  // Connect to database
const connection = mongoose.connection;             // Store database as a variable

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
            let AllPosts = await postcoll.find({}, {sort:{postDate:-1}}).toArray(); // -1 Sorts posts from newest to oldest order as an array, store it in AllPosts
            for (const post of AllPosts){ // For each post...
                let founduser = await usercoll.findOne({'userId': post.posterId});  // Find a userId that matches the post's posterId, returns the user
                post.postUsername = founduser.username;                             // Attach a postUsername attribute to the post for rendering purposes only (does not appear in database)
                post.dpType = founduser.dp.contentType;                             // Attach a dpType attribute to the post for rendering purposes only (does not appear in database)
                post.dpBuffer = founduser.dp.data.toString('base64');               // Attach a dpBuffer attribute to the post for rendering purposes only (does not appear in database)
            }
            res.render('Home', { AllPosts });                                       // render `../views/Home.hbs with posts from database`
        }, 5);
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
            post.poster = user.username;
            post.dpType = user.dp.contentType;
            post.dpBuffer = user.dp.data.toString('base64');
            user.content = user.dp.data.toString('base64');

            // creating variables for count statistics
            let countPost = post.length;
            let countComment = comment.length;
            let stat = {countPost, countComment}

            res.render('Profile', {user, post, stat});

        }, 5);
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
            let comments = await commcoll.find({'postId': id}).toArray();
            for (const comment of comments){
                let founduser = await usercoll.findOne({'userId': comment.commenterId});
                comment.postUsername = founduser.username;
                comment.dpType = founduser.dp.contentType;
                comment.dpBuffer = founduser.dp.data.toString('base64');
            }
            res.render('Expanded Post', {post, comments});
        }, 5);
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

        getUser: function (req, res) {
            setTimeout(async () => {
                let usercoll = connection.db.collection("users");
                let username = req.params.username;
                let password = req.params.password;

                let result = await usercoll.findOne({username: username, password: password});

                res.send(result);
            }, 5);
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
}


/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = controller;

