// Whole-script strict mode syntax
'use strict';

// Initalize the modules

var liveServer = require("live-server");

var params = {
    port: 9000, // Set the server port. Defaults to 8080. 
    host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP. 
    root: "./public", // Set root directory that's being server. Defaults to cwd. 
    open: false, // When false, it won't load your browser by default.
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications) 
    wait: 1, // Waits for all changes, before reloading. Defaults to 0 sec. 
    mount: [
        ['/node_modules', './node_modules']
    ], // Mount a directory to a route. 
    logLevel: 2
};
liveServer.start(params);