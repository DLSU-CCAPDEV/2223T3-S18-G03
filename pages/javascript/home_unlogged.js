// Borrowed from Tristan's script.js <3
const search_bar = document.getElementById("searchbar");
search_bar.addEventListener("keydown", search, false);
function search(e){
    if(e.keyCode == "13"){
        location.href = "/pages/searchresults.html";
    }
}

function showPost(){

    if(localStorage.created_title === "del") return;
    const main = document.getElementById("all_posts");
    const main_copy = main.innerHTML;
    //alert(localStorage.created_title);
    new_post = `

    <div class = forum_post>
    <div class="hori">
        <div class="vert">
            <img src="../images/profilepicture.jpg" width="75px" height="75px" class="post_profpic">
            <div class = "hori" style="justify-content: space-around;">
                <div class="upvote"></div>
                <div class="vote">0</div>
                <div class="downvote"></div>
            </div>
            
        </div>
        <div class="vert">
                <div class="hori" style="justify-content:space-between; width:600px">
                    <p class=post_author>Posted by LiveJesusInOurHeartsAmen:</p>
                </div>
            <div><p class=post_title>${localStorage.created_title}</p></div>
            <div><p class=post_text>
                ${localStorage.created_text}
            </p></div>

        </div>

    </div>
    
    </div>
    `



        main.innerHTML -= main_copy;
        main.innerHTML += new_post;
        main.innerHTML += main_copy;

    refresh();
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