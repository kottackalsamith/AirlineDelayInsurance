// Whole-script strict mode syntax
'use strict';

var express = require('express');

var http = require('http');
var path = require('path');


var morgan = require('morgan');

var config = require('./server.config');

var app = express();
var publicDir = path.join(__dirname, 'public')



// log every request to the console
app.use(morgan('dev'));

// For serving static assets
app.use(express.static(publicDir, {
    maxAge: config.oneDay
}));

// 


app.use('/scripts/systemjs', express.static(__dirname + '/node_modules/systemjs/dist/'));



app.get('/', function(req, res) {
    res.sendFile(path.join(publicDir, 'index.html'));
});


var server = http.createServer(app);


// Start Server
var myserver = server.listen(config.httpPort, config.host, function() {
    var host = myserver.address().address;
    var port = myserver.address().port;
    console.log('Server running at http://%s:%s', host, port);
});