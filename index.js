const http = require("http")

http
    .createServer(function(req,res){
        res.writeHead(200,{"Content-Type":"text/html"})

        res.write("<h1>FanCafe</h1>")
        res.write("<p>Where the fans meet</p>")

        res.end()
    })
    .listen(3000)