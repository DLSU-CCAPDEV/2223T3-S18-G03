const mongoose = require("mongoose");
//mongoose.connect('mongodb://127.0.0.1/Kahit-Ano');  // Connect to database
const connection = mongoose.connection;             // Store database as a variable



const db = require('../models/db.js');

const {Comment, Logger} = require('../models/content_db.js');
//var logger = require('../logger.json');              // Get logged in condition

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const addCommentcontroller = {
        commentAdd: function (req, res) {

            let commentcoll = connection.db.collection("comments");
            post_id = parseInt(req.query.id);

            setTimeout(async () => {

                let lastcomment = await commentcoll.findOne({}, {sort:{commentId:-1}})
                var newComment = {
                    comment: req.body.comment,
                    commentId: lastcomment.commentId+1, 
                    score: 0,
                    postId: post_id,
                    commenterId: req.session.userId,
                    commentDate: new Date(),
                };

                await db.insertOne(Comment, newComment);  // Then add post to database
            }, 100);
        
        }
}


/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = addCommentcontroller;

