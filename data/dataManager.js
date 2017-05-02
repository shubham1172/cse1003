//Include modules
var pgp = require('pg-promise')();
var config = require('./../config/config.js');

//POOL config
var pool = pgp(config.DBMS_CONFIG);

/**
 * If user details does not exist in the database, create new user.
 */
exports.checkUser = function(username, callback){
  pool.one(`SELECT * FROM cse1003.users WHERE username = $1`, [username])
  .then(function(data){
    callback(data);
  })
  .catch(function(error){
    console.log(error);
    callback("error");
  });
}