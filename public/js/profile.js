$(document).ready(function (){

    $('#edit_bio').on('submit', function (e){
        e.preventDefault();
        
        const formData = $(this).serialize();

        // collect form data and break into components
        let params = new URLSearchParams(formData);
        let username = params.get('username');
        let bio = params.get('bio');
        let pw = params.get('pw');
        
        if (username == "" && bio == ""){
            $('#error').text('No Changes Made!');
            $('#error').css('color', 'red');
            return;
        }

        $.post('/checkPassword', {pw: pw}, function (result){
            
            if (result){
                console.log('Password Match!');

                $.get('/updateProfile', {username: username, bio: bio}, function(result){
                    if (result){
                        console.log(result);
                        $('#error').text('Password Updated Successfully!');
                        $('#error').css('color', 'green');
                    }
                });

                
            }
            else{
                $('#error').text('Invalid Password!');
                $('#error').css('color', 'red');
            }
        });
    });
});