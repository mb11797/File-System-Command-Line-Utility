let fs = require("fs");
let path = require('path');

module.exports.treefy = function(){
    let src = arguments[0];
    let dest = arguments[1];

    let buffer = fs.readFileSync(path.join(src, "metadata.json"));

    let json = JSON.parse(buffer);
    treefyHandler(src, dest, json);
}

function treefyHandler(src, dest, node){
    let isFile = node.isFile;
    if(isFile == true){
        //create file using original name and then copy data in it
        let srcFilePath = path.join(src, node.newName);
        let destFilePath = path.join(dest, node.originalName);
        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(`File copied from ${srcFilePath} to ${destFilePath}`);
    }
    else{
        //create directory
        let dirName = node.name;
        let createdDirPath = path.join(dest, dirName);
        if(!fs.existsSync(createdDirPath))
            fs.mkdirSync(createdDirPath);
        
        console.log(`Directory created at ${createdDirPath}`);
        //Recursion - visit children
        for(let i=0; i<node.children.length; i++){
            let child = node.children[i];
            let child_dest = createdDirPath;
            treefyHandler(src, child_dest, child);
        }
    }
}