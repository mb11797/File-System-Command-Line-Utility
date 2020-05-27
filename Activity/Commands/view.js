let fs = require("fs");
let path = require('path');

module.exports.view = function(){
    let src = arguments[0];
    let args = arguments[1];

    if(args == '-t'){
        viewAsTree(src, "");
    }
    else if(args == '-f'){
        viewAsFlatFile(src);
    }
    else{
        console.log("Wrong Argument");
    }
}

function viewAsTree(src, psf){
    let isFile = fs.lstatSync(src).isFile();
    let name = path.basename(src);

    if(isFile == true){
        //print file name
        console.log(psf + "/" + name + "*");
    }
    else{
        //print directory name
        console.log(psf + "/" + name);
        //read content src
        // further call viewAsTree
        let content = fs.readdirSync(src);
        for(let i=0; i<content.length; i++){
            let child = content[i];
            let cPath = path.join(src, child);
            viewAsTree(cPath, psf + "|---");
        }
    }
}


function viewAsFlatFile(src){

}