// In nodejs:
// => directory path 
// content => directories, files (read karna aana chahiye) => (How to read content of a dir in nodejs ( no of files, dirs in a dir)) ???
// difference => directory, file (How to differentiate bw file or dir (folder) in nodejs ?)

console.log();
console.log();


let fs = require('fs');
let path = require("path");

function fslist(src){
    let isFile = fs.lstatSync(src).isFile();
    if(isFile == true){
        console.log(src + "*");
    }
    else{
        console.log(src);
        // read content src
        // further call fslist
        let content = fs.readdirSync(src);
        for(let i=0; i<content.length; i++){
            let child = content[i];
            // let cPath = src + "/" + child;          //not standard way, bcz linux, windows, mac use diff. ways for "/"
            let cPath = path.join(src, child);         //standard way
            fslist(cPath);
        }
    }
}

// let isDirectory = fs.lstatSync("/media/manas/New Volume/Placement Bootcamp/Development/Lecture-2_01_04_2020/Raw/Facts/input.js").isDirectory();
// console.log(isDirectory);
// let is_Directory = fs.lstatSync("/media/manas/New Volume/Placement Bootcamp/Development/Lecture-2_01_04_2020/Raw/Facts").isDirectory();
// console.log(is_Directory);


//How to read content of a directory in nodeJS?

console.log("List View: ");
fslist("/media/manas/New Volume/Github Projects/File-System-Command-Line-Utility-using-NodeJS/Raw/POC/d1");
console.log();
console.log();


//how to get last name of a path in nodeJS?
//path.basename()


//psf => path so far
function fstree(src, psf){
    let isFile = fs.lstatSync(src).isFile();
    let name = path.basename(src);
    if(isFile == true){
        console.log(psf + "/" + name + "*");
    }
    else{
        console.log(psf + "/" + name);
        // read content src
        // further call fslist
        let content = fs.readdirSync(src);
        for(let i=0; i<content.length; i++){
            let child = content[i];
            // let cPath = src + "/" + child;          //not standard way, bcz linux, windows, mac use diff. ways for "/"
            let cPath = path.join(src, child);         //standard way
            fstree(cPath, psf + "|---");
        }
    }
}

console.log("Tree View: ");
// let src = "/media/manas/New Volume/Github Projects/File-System-Command-Line-Utility-using-NodeJS/Raw/POC/d1";
fstree("/media/manas/New Volume/Github Projects/File-System-Command-Line-Utility-using-NodeJS/Raw/POC/d1", "");
// fstree("/media/manas/New Volume/Github Projects/File-System-Command-Line-Utility-using-NodeJS/Raw/POC/d1", src);