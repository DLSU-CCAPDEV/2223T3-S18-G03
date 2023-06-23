//const main = window.open('HomeLogged.html')
function submitPost(){
    localStorage.clear();
    
    if(typeof(localStorage) !="undefined"){
        localStorage.created_title = document.getElementById("created_title").value;
        localStorage.created_text = document.getElementById("created_text").value;
        //localStorage.attached_image = document.getElementById("attached_image").files[0].name;
    }

    document.getElementById("post_template").submit();
}



refresh();
