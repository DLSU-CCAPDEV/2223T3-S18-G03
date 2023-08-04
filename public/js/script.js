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

const users = document.getElementsByClassName("pfp");
for(var i = 0; i < users.length; i++) {
    var user = users[i];
    user.onclick = function() {
        location.href = "../Profile.html";
    }
}

const add_comment = document.getElementById("add-comment");
const comments_container = document.getElementById("comments");
add_comment.addEventListener("keydown", add_comment_enter, false);
function add_comment_enter(e){
    if(e.keyCode == "13"){
        e.preventDefault();
        if(add_comment.value === "") return; 
        html = `<div class="vert comment">
                    <div class="hori">
                        <div class="vert rate">
                            <div class="upvote"></div>
                            <div class="vote">0</div>
                            <div class="downvote"></div>
                        </div>
                        <div class="vert comment-proper">
                            <div class="user">
                                <img src="../images/prof_pics/anya.jpg" class="pfp">
                                <div>Anyalover69</div>
                            </div>
                            <div class="content">${add_comment.value}</div>
                            <textarea class="add-reply" placeholder="Add a reply..."></textarea>
                        </div>
                    </div>
                </div>`
        comments_container.innerHTML += html;
        add_comment.value = "";
        refresh();
    }
}
refresh();
function refresh(){
    var add_reply = document.getElementsByClassName("add-reply");
    for(var i = 0; i < add_reply.length; i++) {
        var reply = add_reply[i];
        reply.addEventListener("keydown", add_reply_enter, false);
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
}
function add_reply_enter(e){
    if(e.keyCode == "13"){
        e.preventDefault();
        if(e.target.value === "") return; 
        var target = e.target.parentElement.parentElement.parentElement;
        var margin = 40;
        html = `<div class="vert comment">
                    <div class="hori">
                        <div class="vert rate">
                            <div class="upvote"></div>
                            <div class="vote">0</div>
                            <div class="downvote"></div>
                        </div>
                        <div class="vert comment-proper">
                            <div class="user">
                                <img src="../images/pfp.png" class="pfp">
                                <div>Lorem ipsum</div>
                            </div>
                            <div class="content">${e.target.value}</div>
                            <textarea class="add-reply" placeholder="Add a reply..."></textarea>
                        </div>
                    </div>
                </div>`
        target.innerHTML += html;
        margin = margin.toString() + "px"
        target.children[target.childElementCount-1].style.marginLeft = margin;
        e.target.value = "";
        refresh();
        console.log("done");
    }
}
function upvote(e){
    parent = e.target.parentElement;
    if(e.target.className.includes("active")){
        e.target.classList.remove("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 1).toString();
    }else if(parent.children[2].className.includes("active")){
        parent.children[2].classList.remove("active");
        e.target.classList.add("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 2).toString();
    }else{
        e.target.classList.add("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 1).toString();
    }
}
function downvote(e){
    parent = e.target.parentElement;
    if(e.target.className.includes("active")){
        e.target.classList.remove("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) + 1).toString();
    }else if(parent.children[0].className.includes("active")){
        parent.children[0].classList.remove("active");
        e.target.classList.add("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 2).toString();
    }else{
        e.target.classList.add("active");
        parent.children[1].innerHTML = (parseInt(parent.children[1].innerHTML) - 1).toString();
    }
}