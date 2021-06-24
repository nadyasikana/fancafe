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

app.use(bodyParser.urlencoded({extended:true}))

//route dengan method get
/*app.get("/api/:nama/:hp", function (req, res) {
  res.statusCode = 200;
  //content-type pada expressjs
  res.setHeader("Content-Type", "text/plain");
  res.send(req.params);
});*/

/*const myMiddleware = (req,res,next)=>{
    if (req.params.nomor === "17"){
        console.log("Nomor terverifikasi")
        next()
    }else{
        const err = {
            status: "error",
            data : {
                nama: req.params.nama,
            },
        };
        next(err)
    }
}*/

/*app.get("/api/:nomor/:nama",myMiddleware,function(req,res){
    res.statusCode=200
    res.setHeader("Content-Type","text/plain")
    res.send(req.params)
})*/

/*app.use((error,req,res,next)=>{
    res.send(error)
})*/

//route dengan method post
/*var data = bodyParser.urlencoded({ extended: false });
app.post("/api/datamember", data, function (req, res) {
  res.send(req.body);
});

app.get("/api/cari", function (req, res, next) {
    var nama = req.query.nama;
    console.log(`nama : ${nama}`);
    var hp = req.query.hp;
    console.log(`No HP : ${hp}`);
    res.send(hp);
  });*/

var mysql = require('mysql');
const { connect } = require("http2");
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'me',
    password : 'secret',
    database : 'my_db'
})

connection.connect((err) =>{
    if(!err)
        console.log('Connected')
    else
        console.log('Error')
})

app.get('/',(req,res)=>{
    res.send(`<html>
                <body>
                    <form action="/data" method = "post">
                        <input type = "text" name = "nomor" placeholder = "nomor"/><br>
                        <input type = "text" name = "nama" placeholder = "nama"/><br>
                        <input type = "text" name = "hp" placeholder = "Nomor HP"/><br>
                        <button type="submit">Join</button>
                    </form>
                </body>
                </html>`)
})

app.post('/data', (req,res) => {
    let nomor = req.body.nomor
    let nama = req.body.nama
    let hp = req.body.hp
    let sql = "INSERT INTO member (nomor, nama, hp) VALUES (?,?,?)"
    connection.query(sql [nomor,nama,hp],function(err,result){
        if (err) throw err
        else {
            res.statusCode = 200
            res.setHeader("Content-Type", "text/plain")
            console.log(`Row inserted : ${result.affectedRows}`)
            console.log(`Row inserted ID : ${result.insertId}`)
        }
    })
    res.end()
})

app.get('/data/list',(req,res)=>{
    let sql = "SELECT * FROM member"
    connection.query(sql, (err,result)=>{
        if (err)
            console.log("error",err)
        res.send(result)
    })
})

app.get('/data/list/:nama', (req, res) => {
    let nama = req.params.nama

    let sql = "SELECT * FROM member WHERE nama = ?"
    connection.query(sql, nama, (err, result) => {
        if (err){
            console.log("error",err)
        }
        else if(result.length>0){
            console.log(result);
            res.send(result)
        }
        else
            res.send("Data tidak ada")
    })
})

app.get('/data/list/:nama/update/:hp', (req, res) => {
    let nama = req.params.nama
    let hp = req.params.hp

    let sql = "UPDATE datadiri SET hp = ? WHERE id = (SELECT id FROM member WHERE nama = ?)"
    connection.query(sql, [hp,nama], (err, result) => {
        if (err) throw err;
        else {
            console.log(`Row updated: ${result.affectedRows}`);
        }
    })
    res.end()
})

app.get('/data/list/delete/:id', (req, res) => {
    let id = req.params.id

    let sql ="DELETE FROM member WHERE id = ?;"
    connection.query(sql, id, (err, result) => {
        if (err) throw err;
        else {
            console.log(`Row deleted: ${result.affectedRows}`);
        }
    })
    res.end()
})

app.listen(3000)

/*app.listen(4000, function () {
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
    .listen(3000)*/