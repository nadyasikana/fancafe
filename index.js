const http = require("http")
const fs = require("fs")

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//https://github.com/expressjs/morgan
var logger = require("morgan");

//Module morgan merupakan modul untuk logger yang berfungsi untuk pencatatan tiap request ke server. Pencatatan ini atau istilahnya logging akan ditunjukkan di console terminal.
app.use(logger("dev"));

app.use(express.static(__dirname + "/publik"));

//route dengan method get
app.get("/api/:nama/:hp", function (req, res) {
  res.statusCode = 200;
  //content-type pada expressjs
  res.setHeader("Content-Type", "text/plain");
  res.send(req.params);
});

//route dengan method post
var data = bodyParser.urlencoded({ extended: false });
app.post("/api/datamember", data, function (req, res) {
  res.send(req.body);
});

app.listen(4000, function () {
  console.log("Server run");
});



http
    .createServer(function(req,res){
        fs.readFile("index.html",(err,data)=>{
            if (err) throw err

            res.writeHead(200,{"Content-Type":"text/html"})

            res.write(data)

        res.end()
        })
    })
    .listen(3000)