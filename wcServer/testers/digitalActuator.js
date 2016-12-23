/**
 * Created by edu on 25-11-2016.
 */

const readline = require('readline');
const httpClient = require('http');


var configurationDB = require('../internal_modules/configurationDB.js');
configurationDB.setUpConfigurationDB("../db/configurationDB.json");
configurationDB.getConfigurationArray();
function randDigitalValue()
{
    var rand = Math.random()*10;

    if(rand > 5)
    {
        rand = 1;
    }
    else
    {
        rand = 0;
    }

    return rand;
}
function sendHttpRequest(mac, iface, callback)
{
    var request = {
        host: '127.0.0.1',
        port: '8080',
        path: '/device/actuator/' + mac + '/' + iface + ''
    };

    var result = {};

    httpClient.get(request, function(response)
    {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            //console.log(d);
            body += d;
        });
        response.on('end', function() {
            //console.log(body);
            result = body.toString('utf8');
            callback(result);
        });
        response.on('uncaughtException', function(err) {
            console.log(err);
        });
        response.on('error', function(err) {
            console.log(err);
        });

    }).on('error', function(e)
    {
        console.log("Cannot connect to server.\n " +
        "Please make shure it is running on localhost")
        clearInterval(timer);
        process.exit();
    });

    return result;
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var macsArray = configurationDB.getActuatorMacs();
//console.log(macsArray);


var question = "Choose a mac address from the list:\n";

var ifacesArray = [];
var i = 1;
macsArray.forEach(function(mac)
{
    question = question + " " + i + ") " + mac + " | With ifaces: ";
    ifacesArray = configurationDB.getActuatorIfacesByMac(mac);

    ifacesArray.forEach(function(iface)
    {
        question = question + " " + iface + " ";
    });
    question = question + "\n";
    i = i +1;
});

//console.log(question);

var chosenMac = 0;
var timer = 0;
rl.question(question, function(answer){
    console.log("You choose: " + answer);
    chosenMac = answer;
    rl.close();

    timer = setInterval(function ()
    {
        ifacesArray.forEach(function(iface)
        {
            //console.log(iface);
            var digitalValue = randDigitalValue();


            var response = sendHttpRequest(macsArray[chosenMac-1], iface, function(response)
            {
                console.log("mac: " + macsArray[chosenMac-1] + " | icafe: " + iface + " value: " + response);
            });
        });
        console.log("");
    }, 5000);
});






