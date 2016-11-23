/**
 * Created by edu on 10-02-2016.
 */

'use strict';


var initGui = function()
{
    console.log("initGui");

    $(function()
    {
        externalModulesInit();
        internalModulesInit();
        guiBindingInit();
        randomWallPaper();
        resetGui();
        startSocketIoConnection();
    });
};

var internalModulesInit = function()
{

};

var externalModulesInit = function()
{

};

var guiBindingInit = function()
{

};

var resetGui = function()
{
	console.log("resetGUI()");
	$("#noConnectionWindow").show();
	$("#mainWindow").hide();
};

var showMainWindow = function()
{
	console.log("showMainWindow()");
	$("#noConnectionWindow").hide();
	$("#mainWindow").show();
};

var buildAreaLink = function(name)
{
    var link = "";
    link = '<li class="">' +
    '<a id="linkAllArea1" href="#">' + name + '<span class="sr-only">(current)</span></a>' +
    '</li>';

    $("#areaLinks").append(link);
};

var buildSensorAreaContent = function(name, value, gpioType,  numberOfSensors)
{
    console.log("name: " + name + " value: " + value + " numberOfSensors: " + numberOfSensors);

    var sensor = "";

    if(numberOfSensors % 3  === 0)
    {
        sensor = sensor +
        '<div class="row">';
    }

    if(gpioType === "digital")
    {
        if(value == 1)
        {
            sensor = sensor +
            '<div class="col-md-4">' +
                '<div class="panel panel-danger">' +
                    '<div class="panel-heading">' + name + '</div>' +
                    '<div class="panel-body">Panel content default</div>' +
                '</div>' +
            '</div>';

        }
        else if(value == 0)
        {
            sensor = sensor +
            '<div class="col-md-4">' +
                '<div class="panel panel-success">' +
                    '<div class="panel-heading">' + name + '</div>' +
                    '<div class="panel-body">Panel content default</div>' +
                '</div>' +
            '</div>';
        }
        else
        {
            sensor = sensor +
            '<div class="col-md-4">' +
                '<div class="panel panel-info">' +
                    '<div class="panel-heading">' + name + '</div>' +
                    '<div class="panel-body">Panel content default</div>' +
                '</div>' +
            '</div>';
        }

        if(numberOfSensors % 3  === 0)
        {
            sensor = sensor +
            '</div>';
        }

    }
    $("#sensorAreaContent").append(sensor);
};

var buildGuiBasedOnServerConfiguration = function(configuration)
{
    //console.log(configuration);
    configuration.areas.forEach(function(area)
    {
        //console.log(area.name);
        buildAreaLink(area.name);
    }.bind(this));

    var numberOfSensors = 0;
    for (var mac in configuration.devices)
    {
        //console.log(key, configuration.devices[key]);
        for (var iface in configuration.devices[mac].iface)
        {
            //console.log(iface, configuration.devices[mac].iface);
            if(configuration.devices[mac].iface[iface].type === "sensor")
            {
                numberOfSensors = numberOfSensors +1;
                var name = configuration.devices[mac].iface[iface].local;
                var value = configuration.devices[mac].iface[iface].value;
                var gpioType = configuration.devices[mac].iface[iface].gpio;
                buildSensorAreaContent(name, value, gpioType, numberOfSensors);
            }
        }
    }
};

var startSocketIoConnection = function()
{
	var socket = io.connect('http://localhost:8080');
	
	socket.on('connect', function (data) 
  	{
  		console.log("socketIO Connected");
  	});
  	
  	socket.on('disconnect', function (data) 
  	{
	  	console.log("socketIO Disconnected");
	  	resetGui();
  	});
  	
  	socket.on('error', function (data) 
  	{
  		console.log("socketIO error");
	  	resetGui();
  	});
	
  	socket.on('notification', function (data) 
  	{
        showMainWindow();
        var configuration = JSON.parse(data);
        buildGuiBasedOnServerConfiguration(configuration);
  	});   
};

var randomWallPaper = function()
{
    var images = ['1', '2', '3', '4', '5'];
    $('body').css({'background-image': 'url(images/wallpaper/wall_' + images[Math.floor(Math.random() * images.length)] + '.jpg)'});
};
