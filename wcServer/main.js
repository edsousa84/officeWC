

var express = require('express');

//var userDB = require('./internal_modules/userDB.js');

var app = express();

//app.listen(8080, function()
//{
//    console.log(' ---------------------------------------------');
//    console.log('|  WC server listening on port 8080   |');
//    console.log(' ---------------------------------------------');
//});

var io = require('socket.io').listen(app.listen(8080, function ()
{
    console.log(' ---------------------------------------------');
    console.log('|  WC server listening on port 8080   |');
    console.log(' ---------------------------------------------');
}));

app.use(express.static('www/html'));

app.on('error', function (err)
{
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

app.get('/device/*', function (req, res)
{
    try
    {
        //console.log("query: ",  req.query);
        //console.log("url: ",  req.url);

        // Device request data frame:
        // /device/[type]/[mac]/[interface]/[value]

        var url = req.url;
        var urlParts = url.split("/");
        //console.log(urlParts);

        var error = 'ERROR (uops dont know why but it is a error)';

        var l = urlParts.length;
        //console.log("Found " + l + " fields");

        //if any of the fields is empty (except none) return a error
        if( !(l == 6 || l == 5))
        {
            error = 'ERROR some fields were not detected. Must have 6 or 5 fields.' + ' Found ' + l + ' fields.';
            console.log(error);
            res.send(error);
        }

        var none = urlParts[0]; //has nothing it is because of the first /
        var device = urlParts[1]; //must be "device"
        var type = urlParts[2]; //must be "sensor" or "actuator"
        var mac = urlParts[3]; //has the mac address of the device
        var iface = urlParts[4]; // has the interface of the device
        var value = urlParts[5]; // has the value of the device

        //if the device field is not "device" return error
        if(device != "device")
        {
            error = 'ERROR the first field must be device';
            console.log(error);
            res.send(error);
        }

        //check if type is sensor or actuator
        var part = "";
        if(type == "sensor")
        {
            //If sensor must have the following req: /device/sensor/BA:AD:C0:FE:73:73/1
            //                                       /device/sensor/[MAC]/[IFACE]/[VALUE]
            //var i = 1; //starts at one because of the first field is empty
            for(var i = 1; i < 4 ; i++)
            {
                part = urlParts[i];
                if(part == "")
                {
                    error = 'ERROR field number ' + i + ' is empty';
                    console.log(error);
                    res.send(error);
                    break;
                }
            }

            configurationDB.setSensorValue(mac, iface, value);
            var actuators = configurationDB.getActuatorsOfSensor(mac, iface);
            configurationDB.setActuatorsValue(actuators, value);
            console.log("Value " + value + " was read from sensor: " + mac + " on iface: " + iface);
            io.emit('notification', configurationDB.getConfigurationJson());
            res.send('OK');
        }
        else if(type == "actuator")
        {
            //If actuator must have the following req: /device/actuator/BA:AD:C0:FE:73:73/1
            //                                         /device/sensor/[MAC]/[IFACE]
            //var i = 1; //starts at one because of the first field is empty
            //var j = 1; //starts at one because of the first field is empty
            for(var j = 1; i < 4 ; i++)
            {
                part = urlParts[j];
                if(part == "")
                {
                    error = 'ERROR field number ' + j + ' is empty';
                    console.log(error);
                    res.send(error);
                    break;
                }
            }

            var actuatorValue = configurationDB.getActuatorValue(mac, iface);
            console.log("Actuator " + mac + " has the value: " + actuatorValue + " on iface: " + iface);

            if (actuatorValue === undefined || actuatorValue === null)
            {
                error = 'ERROR actuator mac or iface does not exist';
                console.log(error);
                res.send(error);
            }
            else
            {
                //It is OK send the value in the response
                res.send(actuatorValue);
            }


        }
        else
        {
            error = 'ERROR field sensor or actuator not found';
            console.log(error);
            res.send(error);
        }
    }
    catch(e)
    {
        var error = 'ERROR (uops dont know why but it is a error)';
        console.log(error);
        console.log("EXCEPTION CAUGHT: " + e);
    }

});

app.get('/info', function (req, res)
{
    try
    {
        res.send(configurationDB.getConfigurationJson());
    }
    catch(e)
    {
        var error = 'ERROR (uops dont know why but it is a error)';
        console.log(error);
        console.log("EXCEPTION CAUGHT: " + e);
    }
});

io.sockets.on('connection', function (socket)
{
	//console.log("socketio connection");
    socket.emit('notification', configurationDB.getConfigurationJson());
});

var configurationDB = require('./internal_modules/configurationDB.js');
configurationDB.setUpConfigurationDB("db/configurationDB.json");
configurationDB.getConfigurationArray();
//console.log(configurationDB.getConfigurationJsonArray());



