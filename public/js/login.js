$(document).ready(function () {

    $('#loginForm').submit(function(e){
        
        /*e.preventDefault();  */                   // Prevent screen refresh
        var username = $('username').val();     // Get username and password from form
        var password = $('password').val();

            
        $.get('/getUser', {username: username, pw: password}, function (result){  // Pass values to /getUser which checks if it exists in the User database
            if (result != null) {                           
                $.get('/profile', result);
            }
            else {
                $('#invalid_login').text('Invalid username or password!');
            }
        });
    });
});