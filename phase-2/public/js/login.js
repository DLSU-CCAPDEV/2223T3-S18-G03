$(document).ready(function () {

    $('#loginForm').submit(function(e){
        e.preventDefault();
        var username = $('username').val();
        var password = $('password').val();

        $.get('/getUser', {username, password}, function (result){
            
        });
    });
});