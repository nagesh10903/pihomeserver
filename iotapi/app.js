var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var users = require('./routes/users');
var devices = require('./routes/devices');
var piconfig = require('./routes/piconfig');
var authenticate = require('./routes/authenticate');
var devicecontrol = require('./routes/devicecontrol');

var aurh=require('./middleware/aurth');

var cors =require('cors');
var staticRoot = __dirname + '/client/';

var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(staticRoot));

//app.use('/api/remotes', remotes);
app.use('/cmd',aurh, devicecontrol);
app.use('/api/users', authenticate);
app.use('/api/users',aurh, users);
app.use('/api/devices',aurh, devices);
app.use('/api/piconfig',aurh, piconfig);

app.use(function(req, res, next){
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');    
    if(accept !== 'html'){return next(); }
    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){return next();}
    fs.createReadStream(staticRoot + 'index.html').pipe(res);
}); 


module.exports = app;
