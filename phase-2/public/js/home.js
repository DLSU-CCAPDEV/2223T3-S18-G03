// Borrowed from Tristan's script.js
const search_bar = document.getElementById("searchbar");
search_bar.addEventListener("keydown", search, false);

function search(e) {
    if (e.keyCode === 13) {
        const searchInputValue = search_bar.value; // Get the value of the search input
        if (searchInputValue.trim() !== "") { // Check if the search input is not empty
            location.href = '/results?query=' + encodeURIComponent(searchInputValue);
        }
    }
}

/*
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
                    <div class="delete_icon"> </p></div>
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
}*/



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

/*
function deletepost(e){
    alert('Post deleted!');
    location.href='/delete';
}
*/

function postshow(e){
    //alert('Post click');


}

function upvote(e){
    e.stopPropagation();
    //const urlParams = new URLSearchParams(window.location.search);
    //const id = urlParams.get('id');
    var change = 0;

    var parent = e.target.parentElement;
    var id = parent.children[3].innerHTML; // Hidden element that contains the ID of the post!
    var logged = parent.children[4].innerHTML; // If logged in or not

    if(logged) {
        if(e.target.className.includes("active")){ // Undo upvote (double click) (-1)
            e.target.classList.remove("active");
            parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 1).toString();
            //location.href = '/vote?query=-1';
            change = -1;
            $.post('/upvote',{id: id, change: change});
    
        }else if(parent.children[2].className.includes("active")){ // Clicking UP while DOWN (+2)
            parent.children[2].classList.remove("active");
            e.target.classList.add("active");
            parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 2).toString();
            change = 2;
            $.post('/upvote',{id: id, change: change});
    
        }else{ // First time pressing   (+1)
            e.target.classList.add("active");
            parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 1).toString();
            change = 1;
            $.post('/upvote',{id: id, change: change});
        }
    } 
    else{
        alert('You have to be logged in to vote!');
    }





}
function downvote(e){
    e.stopPropagation();
    var change = 0;

    var parent = e.target.parentElement;
    var id = parent.children[3].innerHTML; // Hidden element that contains the ID of the post!
    var logged = parent.children[4].innerHTML; // If logged in or not

    if(logged) {
        if(e.target.className.includes("active")){ // Undo downvote (double click) (+1)
            e.target.classList.remove("active");
            parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 1).toString();
            change = 1;
            $.post('/downvote',{id: id, change: change});
    
        }else if(parent.children[0].className.includes("active")){  // Clicking DOWN while UP (-2)
            parent.children[0].classList.remove("active");
            e.target.classList.add("active");
            parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 2).toString();
            change = -2;
            $.post('/downvote',{id: id, change: change});
        }else{ // First time pressing   (-1)
            e.target.classList.add("active");
            parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 1).toString();
            change = -1;
            $.post('/downvote',{id: id, change: change});
    
        }
    }
    else{
        alert('You have to be logged in to vote!');
    }



}

