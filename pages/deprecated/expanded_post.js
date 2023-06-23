const search_bar = document.getElementById("searchbar");
search_bar.addEventListener("keydown", search, false);
function search(e){
    if(e.keyCode == "13"){
        location.href = "SearchResults.html";
    }
}

const users = document.getElementsByClassName("pfp");
for(var i = 0; i < users.length; i++) {
    var user = users[i];
    user.onclick = function() {
        location.href = "Profile.html";
    }
}
const users2 = document.getElementsByClassName("username");
for(var i = 0; i < users2.length; i++) {
    var user = users2[i];
    user.onclick = function() {
        location.href = "Profile.html";
    }
}
document.getElementById("login").onclick = function(){
    location.href = "Login.html";
}
document.getElementById("register").onclick = function(){
    location.href = "Register.html";
}
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
function upvote(e){
    alert("You need to be logged in to upvote!");
}
function downvote(e){
    alert("You need to be logged in to downvote!");
}