/**
 * This manages GPIO operations
 */

//include modules

var gpio = require('rpi-gpio');
var dht = require('dht-sensor');
var async = require('async');
var config = require('./../config/config.js');
var led = false;
var OUT = [22,23,24,25];
var DHT_PIN = 18;
var LED_PIN = 26; var status = false;
var STATE = [0,0,0,0];

//setup
gpio.setMode(gpio.MODE_BCM);
async.map(OUT, function(bit, done){
    //for each bit, setup
    gpio.setup(bit, gpio.DIR_IN, gpio.EDGE_BOTH);
    done();
}, function(err, results){
    if(err)
        console.log(error);
});

//led
gpio.setup(LED_PIN, gpio.DIR_OUT);

function write(){
    led = !led;
    gpio.write(LED_PIN, led, function(err){
        if(err)
            console.log(err);  
    });
}
gpio.on('change', function(channel, value){
    console.log('Channel '+channel+' value is now '+value);
    STATE[channel-22] = value;
});

exports.readValues = function(req, res){
    res.send(JSON.stringify(STATE));
}

exports.readTemp = function(req, res){
    curr = dht.read(11, DHT_PIN); 
    console.log("Humidity " + curr.humidity + " Temperature " + curr.temperature);
    res.send(JSON.stringify(curr));
}

exports.toggle = function(req, res){
    write();
    res.send(led);
}