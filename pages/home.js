// Borrowed from Tristan's script.js
function showPost(){
    const main = document.getElementById("all_posts");
    const main_copy = main.innerHTML;
    //alert(localStorage.created_title);
    new_post = `
    <div class = forum_post>
    <div class="hori">
        <div class="vert">
            <img src="../images/pfp.png" width="75px" height="75px" class="post_profpic">
            <div class = "hori" style="justify-content: space-between;">
                <div class="upvote"></div>
                <div class="vote">0</div>
                <div class="downvote"></div>
            </div>
        </div>
        <div class="vert">
            <div><p class=post_author>Posted by Lorem Ipsum:</p></div>
            <div><p class=post_title>${localStorage.created_title}</p></div>
            <div><p class=post_text>
                ${localStorage.created_text}
                <img class="post_image" src="${localStorage.attached_image}" width="100%" height="100%">
            </p></div>
        </div>
    </div>
    </div>
    `

    new_post_imageless = `
    <div class = forum_post>
    <div class="hori">
        <div class="vert">
            <img src="../images/pfp.png" width="75px" height="75px" class="post_profpic">
            <div class = "hori" style="justify-content: space-between;">
                <div class="upvote"></div>
                <div class="vote">0</div>
                <div class="downvote"></div>
            </div>
        </div>
        <div class="vert">
            <div><p class=post_author>Posted by Lorem Ipsum:</p></div>
            <div><p class=post_title>${localStorage.created_title}</p></div>
            <div><p class=post_text>
                ${localStorage.created_text}
            </p></div>
        </div>
    </div>
    </div>
    `

    if(!localStorage.attached_image) {
        main.innerHTML -= main_copy;
        main.innerHTML += new_post_imageless;
        main.innerHTML += main_copy;
    }
    else {
        main.innerHTML -= main_copy;
        main.innerHTML += new_post;
        main.innerHTML += main_copy;
    }
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
    alert('Post click');


}

function upvote(e){
    e.stopPropagation();
    parent = e.target.parentElement;
    if(e.target.className.includes("active")){
        e.target.className = 'upvote'           // Icon Change
        e.target.classList.remove("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 1).toString();
    }else if(parent.children[2].className.includes("active")){
        e.target.className = 'upvote'           // Icon Change
        parent.children[2].classList.remove("active");
        e.target.classList.add("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 2).toString();
    }else{
        e.target.className = 'upvote_filled'    // Icon Change
        e.target.classList.add("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 1).toString();
    }
}
function downvote(e){
    e.stopPropagation();
    parent = e.target.parentElement;
    if(e.target.className.includes("active")){
        e.target.className = 'downvote'         // Icon Change
        e.target.classList.remove("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 1).toString();
    }else if(parent.children[0].className.includes("active")){
        e.target.className = 'downvote'         // Icon Change
        parent.children[0].classList.remove("active");
        e.target.classList.add("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 2).toString();
    }else{
        e.target.className = 'downvote_filled'  // Icon Change
        e.target.classList.add("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 1).toString();
    }
}

