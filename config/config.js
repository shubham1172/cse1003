/**
 * This is the configuration file.
 * It stores all the configuration parameters for our server!
*/

var config = {}

config.IP = "192.168.42.1";
//PORT NUMBER for web app
config.PORT_NUMBER = 8082;
//DATABASE configuration
config.DBMS_CONFIG = {
    user: 'postgres',
    database: 'postgres',
    host: '127.0.0.1',
    port: '5432',
    password: process.env.DB_PASSWORD
};

//PERMITTED URLs for authentication
config.PERMITTED_URLS = ["/", "/check-login", "/logout", "/login"];
//HTTP CODES for usage
config.HTTP_CODES = {OK: 200, BAD_REQUEST: 400, FORBIDDEN: 403, SERVER_ERROR: 500};

module.exports = config;
