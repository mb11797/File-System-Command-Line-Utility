let fs = require("fs");
let path = require("path");
var uniqid = require('uniqid');

module.exports.untreefy = function(){
    let src = arguments[0];
    let dest = arguments[1];
    let root = {};
    untreefyHandler(src, dest, root);

    fs.writeFileSync(`${dest}/metadata.json`, JSON.stringify(root));
}


function untreefyHandler(src, dest, node){
    let isFile = fs.lstatSync(src).isFile();
    if(isFile){
        //File data copy into new file with random name in dest directory
        let newFileName = uniqid();
        let destPath = path.join(dest, newFileName);
        fs.copyFileSync(src, destPath);
        console.log(`Data copied from ${src} to ${destPath}`);
        
        //store info
        node.isFile = true;
        node.originalName = path.basename(src);
        node.newName = newFileName;
    }
    else{
        //store info
        node.isFile = false;
        node.children = [];
        node.name = path.basename(src);

        //content read
        let content = fs.readdirSync(src);
        
        //recursion
        for(let i=0; i<content.length; i++){
            let child = content[i];
            let child_obj = {};
            let cPath = path.join(src, child);

            untreefyHandler(cPath, dest, child_obj);
            node.children.push(child_obj);
        }
    }
}