#!/usr/bin/env node

var fs = require('fs');

if(process.argv[2] == null){
    console.log("Usage: node pets.js [read | create | update | destroy]");
    process.stderr.write("Incorrect Usage");
    process.exit(1);
}else if(process.argv[2] === "read"){
    read();
}else if(process.argv[2] === "create"){
    create();
}else if(process.argv[2] === "update"){
    update();
}else if(process.argv[2] === "destroy"){
    destroy();
}




function read(){
    fs.readFile("./pets.json", "utf8", function(error, data){
        if(error){
            console.log(error);
        }else{
            if(process.argv[3] == null){
                let dataBase = JSON.parse(data);
                for(let i = 0; i < dataBase.length; i++){
                    console.log(dataBase[i]);
                }
            }else{
                let item = JSON.parse(data)[Number(process.argv[3])];
                if(item == null){
                    console.log("Usage: node pets.js read INDEX");
                    process.stderr.write("Incorrect Usage");
                    process.exit(1);
                }else{
                    console.log(item);
                }
            }
        }
    });
}

function create(){
    if(process.argv.length === 6){
        if(!isNaN(process.argv[3])){
            fs.readFile("./pets.json", "utf8", function(error, data){
                if(error){
                    console.log(error);
                }else{
                    let dataBase = JSON.parse(data);
                    let input = {};
                    input.age = Number(process.argv[3]);
                    input.kind = process.argv[4];
                    input.name = process.argv[5];
                    dataBase.push(input);
                    fs.writeFile("./pets.json", JSON.stringify(dataBase), function(error){
                        if(error){
                            console.log("error");
                        }else{
                            console.log(input);
                        }
                    });
                }
            });
        }else{
            console.log("Usage: node pets.js create AGE KIND NAME");
            process.stderr.write("Incorrect Usage");
            process.exit(1);
        }
    }else{
        console.log("Usage: node pets.js create AGE KIND NAME");
        process.stderr.write("Incorrect Usage");
        process.exit(1);
    }
}

function update(){
    if(process.argv.length === 7){
        if(!isNaN(process.argv[3]) && !isNaN(process.argv[4])){
            fs.readFile("./pets.json", "utf8", function(error, data){
                if(error){
                    console.log(error);
                }else{
                    let dataBase = JSON.parse(data);
                    let item = dataBase[Number(process.argv[3])];
                    if(item == null){
                        console.log("There is no entry yet");
                        process.stderr.write("No entry");
                        process.exit(1);
                    }else{
                        item.age = Number(process.argv[4]);
                        item.kind = process.argv[5];
                        item.name = process.argv[6];
                        fs.writeFile("./pets.json", JSON.stringify(dataBase), function(error){
                            if(error){
                                console.log("error");
                            }else{
                                console.log(item);
                            }
                        });
                    }
                }
            });
        }else{
            console.log("Usage: node pets.js update INDEX AGE KIND NAME");
            process.stderr.write("Incorrect Usage");
            process.exit(1);
        }
    }else{
        console.log("Usage: node pets.js update INDEX AGE KIND NAME");
        process.stderr.write("Incorrect Usage");
        process.exit(1);
    }
}

function destroy(){
    if(process.argv.length === 4){
        if(!isNaN(process.argv[3])){
            fs.readFile("./pets.json", "utf8", function(error, data){
                if(error){
                    console.log(error);
                }else{
                    let dataBase = JSON.parse(data);
                    let item = dataBase.splice(process.argv[3], 1);
                    fs.writeFile("./pets.json", JSON.stringify(dataBase), function(error){
                        if(error){
                            console.log(error);
                        }else{
                            console.log(item[0]);
                        }
                    });
                }
            });
        }else{
            console.log("Usage: node pets.js destroy INDEX");
            process.stderr.write("Incorrect Usage");
            process.exit(1);
        }
    }else{
        console.log("Usage: node pets.js destroy INDEX");
        process.stderr.write("Incorrect Usage");
        process.exit(1);
    }
}