// Configuration file for the application

'use strict';

module.exports = {

    // set the http server port
    "httpPort": process.env.PORT || 9000,
    // set the server host
    "host": "127.0.0.1",
    // static directory to serve
    "directoryToServe" : '/public',
    // time 
    "oneDay":86400000
};