// Borrowed from Tristan's script.js <3
const search_bar = document.getElementById("searchbar");
search_bar.addEventListener("keydown", search, false);
function search(e){
    if(e.keyCode == "13"){
        location.href = "/pages/searchresults.html";
    }
}

refresh();
function refresh(){
    var upvotes = document.getElementsByClassName("upvote");
    for(var i = 0; i < upvotes.length; i++) {
        var up = upvotes[i];
        up.addEventListener("click", upvote);
    }
    var downvotes = document.getElementsByClassName("downvote");
    for(var i = 0; i < downvotes.length; i++) {
        var down = downvotes[i];
        down.addEventListener("click", downvote);
    }
    var home_posts = document.getElementsByClassName("forum_post");
    for(var i = 0; i < home_posts.length; i++) {
        var homepost = home_posts[i];
        homepost.addEventListener("click", postshow);
    }
}

function postshow(e){
    //alert('Post click');



}
function upvote(e){
    e.stopPropagation();
    alert("You need to be logged in to upvote!");
}
function downvote(e){
    e.stopPropagation();
    alert("You need to be logged in to downvote!");
}