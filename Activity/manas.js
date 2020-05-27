let {view} = require('./Commands/view');
let {treefy} = require('./Commands/treefy');
let {untreefy} = require('./Commands/untreefy');
let {help} = require('./Commands/help');

let cmd = process.argv[2];

switch(cmd){
    case "view":
        view(process.argv[3], process.argv[4]);
        break;
    case "treefy":
        treefy(process.argv[3], process.argv[4]);
        break;
    case "untreefy":
        untreefy(process.argv[3], process.argv[4]);
        break;
    case "help":
        help();
        break;
    default:
        console.log("Wrong command");
        break;
}
