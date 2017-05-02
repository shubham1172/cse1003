$(document).ready(function(){
    //LOAD username
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.readystate = XMLHttpRequest.DONE){
            if(xhr.status===200)
                $('#username').html(xhr.responseText);
            else
                $('#username').html("Error");
        }
    }
    xhr.open('GET', 'http://192.168.42.1:8082/check-login', true);
    xhr.send();  
    //converts 4 bit bin to decimal  
    function bin2dec(binString){
        return parseInt(binString, 2);
    }
    //append values to counter
    function counter(){
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.readystate = XMLHttpRequest.DONE){
                if(xhr.status===200){
                    data = JSON.parse(xhr.responseText);
                    str = "";
                    for(var i=1;i<=4;i++){
                       str += Number(data[i-1]).toString();
                       $('#bit'+i.toString()).html(Number(data[i-1]));
                    }
                    $('#decimal').html(bin2dec(str));
               }else{
                   $('decimal').html("ERROR");
               }
            }
        }
        xhr.open('GET', 'http://192.168.42.1:8082/get-counter', true);
        xhr.send();
    }
    //append room information
    function temp(){
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.readystate = XMLHttpRequest.DONE){
                if(xhr.status===200){
                    data = JSON.parse(xhr.responseText);
                    $('#temp').html(data.temperature);
                    $('#humid').html(data.humidity);
               }else{
                   $('#temp').html("ERROR");
               }
            }
        }
        xhr.open('GET', 'http://192.168.42.1:8082/get-dht', true);
        xhr.send();
    }
    $('#light').on('click', function(){
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.readystate = XMLHttpRequest.DONE){
                if(xhr.status===200){
                    console.log(xhr.responseText);
               }else{
                   $('#light').html("ERROR");
               }
            }
        }
        xhr.open('GET', 'http://192.168.42.1:8082/toggle', true);
        xhr.send();
    });
    function append(){
        temp();
        counter();
    }
    setInterval(append, 500);
});