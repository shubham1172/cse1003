/**
 * This is the router file.
 * It manages all routing and directing!
*/

//Include modules
var express = require('express');
var router = express.Router();
var path = require('path');
var sessionManager = require('../logic/sessionManager');
var pinManager = require('../logic/pinManager');

//www.example.com/public/?filePath=/script.js
router.get('/public', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/', req.query.filePath));
});

/** SESSION routes */
router.post('/login', function(req ,res){
	sessionManager.login(req, res);
});

router.get('/logout', function(req ,res){
	sessionManager.logout(req, res);
});

router.get('/check-login', function(req, res){
	sessionManager.checkLogin(req, res);
});

router.get('/dash.html', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/dash.html'));
});

router.get('/get-counter', function(req, res){
	pinManager.readValues(req, res);
});

router.get('/get-dht', function(req, res){
	pinManager.readTemp(req, res);
});

router.get('/toggle', function(req, res){
	pinManager.toggle(req, res);
});

//INDEX redirection for / or any invalid url
router.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/index.html'));
});

module.exports = router;
