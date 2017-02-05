"use strict";
/* Kanebooru API Base */
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const fs = require("fs");
var path    = require("path");
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var router = express.Router();   

router.get('/api', function(req, res) {
    res.json({
        version: "1",
        author: "keinekamishirasawa"
    });   
});

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    res.sendFile(path.join(__dirname + '/css/materialize.min.css'))
})

app.use('/', router);
app.listen(process.env.PORT);
console.log('Listening on port ' + process.env.PORT);

