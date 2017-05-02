$(document).ready(function(){
    $('#loginButton').click(function(){
       var username = $('#username').val();
       var password = $('#password').val();
       if(username==""||password=="")
        alert('Please fill the form correctly!');
       else{
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.readystate = XMLHttpRequest.DONE){
                if(xhr.status===200){
                    window.location.href = 'http://192.168.42.1:8082/dash.html'
                }else if(xhr.status===403){
                    alert('Invalid username/password');
                    $('#username').val("");
                    $('#password').val("");
                }else{
                    alert('Server Error. Try again in sometime');
                    $('#username').val("");
                    $('#password').val("");
                }
            }
        }
        xhr.open('POST', 'http://192.168.42.1:8082/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({username: username, password: password}));
       }
    });
});