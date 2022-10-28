
var fs = require("fs");
var http = require("http");
var parser = require("querystring");
var port = process.env.PORT || 8000;

var server = http.createServer((req, res)=>{

    const validRoute = /\/pets\/(?<index>\d+$)|^\/pets+$/;
    

    if(req.method === "GET" && validRoute.test(req.url)){
        console.log(req.url.match(validRoute));
        read(req, res, req.url.match(validRoute)[1]);
    }else if(req.method === "POST" ){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
            console.log(body);
        });
        req.on('end', () => {
            console.log(body);

            res.end('ok');
        }); 
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not found");
    }
});
server.listen(port, function(){
    console.log(`Listening on port: ${port}`);
    
});

function read(req, res, index){
    if(index){
        fs.readFile("./pets.json", "utf8", (error, data) => {
            if(error){
                serverError(res);
            }else{
                let dataBase = JSON.parse(data);
                let item = dataBase[index];
                if(item == null){
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/plain");
                    res.end("Not found");
                }else{
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(item));
                }
            }
        });
    }else{
        fs.readFile("./pets.json", "utf8", (error, data) => {
            if(error){
                serverError(res);
            }else{
                res.setHeader("Content-Type", "application/json");
                res.end(data);
            }
        });
    }
}

function serverError(res){
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
}
