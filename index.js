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

router.post('/api/users', function(req, res) {
        let reqq = {
            username: req.body.username || null,
            password: req.body.password || null
        }
        if (reqq.username == null) {
            res.json({ code: 400, reason: "Could not find username querystring."})
        } else if (reqq.password == null) {
            res.json({ code: 400, reason: "Could not find password querystring."})
        } else {
            if (!fs.existsSync("./api/users.json")) {
                fs.appendFile("./api/users.json")
            } else {
                let users = require("./api/users.json")
                users.push(reqq)
                res.json({ code: 200, user: reqq})
                fs.appendFile("./api/users.json", users, "utf8", (error, resp) => {
                    
                })
            }
            
        }
});

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.use('/', router);
app.listen(process.env.PORT);
console.log('Listening on port ' + process.env.PORT);

