/**
  * This is the session management file
  * accounts for the user session management.
  * Implements
  * 1. login()
  * 2. logout()
  * 3. checkLogin()
*/

//Include modules
var config = require('./../config/config.js');
var crypto = require('crypto');
var path = require('path');
var dataManager = require('./../data/dataManager.js');

/** Returns hash of a input */
function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$').toString('hex')  ;
}

/**
 * Adds auth cookie if username password is correct
 */
exports.login = function(req, res){  
  var username = req.body.username;
  var password = req.body.password;
  dataManager.checkUser(username, function(data){
    if(data=="error")
        res.status(config.HTTP_CODES.SERVER_ERROR).send("Error");
    else{
        var dbString = data.password;
        var salt = dbString.split('$')[2];
        var hashedPassword = hash(password, salt);
        if(hashedPassword==dbString){
          req.session.auth = {username: username};
          res.status(config.HTTP_CODES.OK).send('Logged in!');
        }else{
          res.status(config.HTTP_CODES.FORBIDDEN).send('username/password is invalid');
        }
      }
    });
}

/**
 * GET request to logout
 * Deletes auth cookie
 */
exports.logout = function(req, res){
  if(req.session&&req.session.auth&&req.session.auth.username){
      delete req.session.auth;
      res.status(config.HTTP_CODES.OK).send("Logged out!");
  }
  else
    res.status(config.HTTP_CODES.FORBIDDEN).send("First log in to log out!")
}

/**
 * GET request to check log in
 * Returns user information if logged in
 */
exports.checkLogin = function(req, res){
  if(req.session&&req.session.auth&&req.session.auth.username){
    res.status(config.HTTP_CODES.OK).send(req.session.auth.username);
  }else
    res.status(config.HTTP_CODES.FORBIDDEN).send("False");
}