$(document).ready(function (){

    $('#edit_bio').submit(function (e){
        const form = document.querySelector('form');
        var x = document.getElementById("profile_bio_edit");
        var y = document.getElementById("profile_edit_button");

        e.preventDefault();
        const fd = new FormData(form);
        const obj = Object.fromEntries(fd);

        $.get('/updateProfile', {username: obj.username, bio: obj.bio}, function(result){
            if (result != null){
                console.log('result in profile.js not null'); // TESTING
                if (obj.username != "") document.getElementById("profile_username").innerHTML = obj.username;
                if (obj.bio != "") document.getElementById("profile_bio").innerHTML = obj.bio;
                //if (obj.pic != null)
                //    document.getElementById("img.profile_pic").src = URL.createObjectURL(obj.pic);
                
                    


                y.style.display = "block";
                x.style.display = "none";
                console.log(obj.username);
                console.log(obj.bio);
                console.log(document.getElementById("profile_picture"));
                //console.log(URL.createObjectURL(obj.pic));
            }
            else{
                console.log('result in profile.js null'); // TESTING
                $('#error-text').text("Profile Update Failed");
                $('#error-text').style('backgorund-color', 'red');
            }
        });
    });

    $('#profile_edit_button').on('click', function(){
        console.log('profile edit clicked'); // TESTING
        var x = document.getElementById("profile_bio_edit");
        var y = document.getElementById("profile_edit_button");

        y.style.display = "none";
        x.style.display = "block";
        $('#error-text').text("__________");
        $('#error-text').style('backgorund-color', 'white');
    });
});