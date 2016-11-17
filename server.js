// Whole-script strict mode syntax
'use strict';

// Initialization of modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var config = require('./server.config');


var app = express();

// The static directory to be served
var publicDir = path.join(__dirname, 'public')

// For parsing the form values
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// log every request to the console
app.use(morgan('dev'));

// For serving static assets
app.use(express.static(publicDir, {
    maxAge: config.oneDay
}));

// Alisaing the path of systemjs in nodemodules
app.use('/scripts/systemjs', express.static(__dirname + '/node_modules/systemjs/dist/'));

// Send request to the routes
var api = require('./app/routes/router')(app, express);

// Append the /api in front of all routes 
app.use('/api', api);

// For serving the index file
app.get('/', function(req, res) {
    res.sendFile(path.join(publicDir, 'index.html'));
});

// Establish connection to mongodb
mongoose.connect(config.database + config.databaseName, function(err) {
    if (err)
        throw err;
    else
        console.log('Database Connected');
});

var server = http.createServer(app)
    .listen(config.httpPort, config.host, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Server running at http://%s:%s', host, port);
    });