
$(document).ready(function (){

    $('#edit_bio').on('submit', function (e){
        e.preventDefault();


        const reader = new FileReader();
        const fileByteArray = []
        const formData = $(this).serialize();

        // collect form data and break into components
        let params = new URLSearchParams(formData);
        let username = params.get('username');
        let bio = params.get('bio');
        let pw = params.get('pw');
        
        let pic = document.getElementById('pic').files[0];
        var picbuffer;
        var picdata;
        var pictype;
        console.log(pw)
        console.log(bio)
        //console.log(pic)







        
        /*
        reader.readAsArrayBuffer(pic);
        reader.onloadend = (evt) => {
          if (evt.target.readyState === FileReader.DONE) {
            const arrayBuffer = evt.target.result,
              array = new Uint8Array(arrayBuffer);
            for (const a of array) {
              fileByteArray.push(a);
            }
            console.log(fileByteArray)
          }
        } */

        let fd = new FormData();
        fd.append('dp',pic);
        fd.append('username', username);
        fd.append('bio', bio);

        //console.log(fd);

        if (username == "" && bio == ""){
            $('#error').text('No Changes Made!');
            $('#error').css('color', 'red');
            return;
        }

        let data = {
            username: username,
            bio: bio,
        }


        if(pic){

            reader.readAsDataURL(pic);
    
            reader.onload = function(){
                picbuffer = reader.result;
                console.log(picbuffer)
                picdata = picbuffer.split(',')[1];
                pictype = picbuffer.split(',')[0].slice('5').split(';')[0];
    
                console.log(pictype)
                console.log(picdata)

                //data.pictype = pictype
                //data.picdata = picdata
            }
        }

        console.log(data);

        $.post('/checkPassword', {pw: pw}, function (result){
            
            if (result){
                console.log('Password Match!');

                
                $.post('/updateProfile', {username: username, bio: bio, picdata: picdata, pictype: pictype}, function(result){
                    if (result){
                        console.log(result);
                        $('#error').text('Profile Updated Successfully!');
                        $('#error').css('color', 'green');
                    }
                });

                /*
                $.ajax({
                    url:'/updateProfile',
                    type:'POST',
                    data: data,
                }) */
                
            }
            else{
                $('#error').text('Invalid Password!');
                $('#error').css('color', 'red');
            }
        });

    });
});