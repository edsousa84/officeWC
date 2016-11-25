/**
 * Created by edu on 25-11-2016.
 */

const readline = require('readline');
const httpClient = require('http');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var question = "Choose a mac address from the list:\n" +
    "1) 0c:8b:fd:9b:a3:93 -> has 1 iface [1]\n" +
    "2) BA:BE:FA:CE:C0:0F -> has 1 iface [1]\n" +
    "3) BA:AD:C0:FE:73:73 -> has 2 ifaces [1, 2,3]\n";

rl.question(question, function(answer){
    // TODO: Log the answer in a database
    console.log("You choose: " + answer);
    rl.close();
});



