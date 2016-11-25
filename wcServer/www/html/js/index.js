/**
 * Created by edu on 10-02-2016.
 */

'use strict';


var initGui = function()
{
    //console.log("initGui");

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
	//console.log("resetGUI()");
	$("#noConnectionWindow").show();
	$("#mainWindow").hide();
    //$("#allSensor").removeClass("active").addClass("active");
};

var showMainWindow = function()
{
	//console.log("showMainWindow()");
	$("#noConnectionWindow").hide();
	$("#mainWindow").show();
};

var buildNavBar = function(name, n)
{
    var link = "";

    link = link +
    '<li id="area' + n + '" class="linkNavBar">' +
        '<a class="" href="#">' + name + '<span class="sr-only">(current)</span></a>' +
    '</li>';

    $("#navBarLinksArea").append(link);
};

var buildSensorAreaContent = function(name, value, gpioType, local, jQueryId)
{
    //console.log("name: " + name + " value: " + value + " numberOfSensors: " + numberOfSensors);
    var sensor = "";

    if(gpioType === "digital")
    {
        if(value == 1)
        {
            sensor = sensor +
            '<div class="col-md-4">' +
                '<div class="panel panel-danger">' +
                    '<div class="panel-heading">' + name + '</div>' +
                    '<div class="panel-body">' +
                        'Value: '+ value + '<br>' +
                        'Local: ' + local + '<br>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }
        else if(value == 0)
        {
            sensor = sensor +
            '<div class="col-md-4">' +
                '<div class="panel panel-success">' +
                    '<div class="panel-heading">' + name + '</div>' +
                    '<div class="panel-body">' +
                        'Value: '+ value + '<br>' +
                        'Local: ' + local + '<br>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }
        else
        {
            sensor = sensor +
            '<div class="col-md-4">' +
                '<div class="panel panel-info">' +
                    '<div class="panel-heading">' + name + '</div>' +
                    '<div class="panel-body">' +
                        'Value: '+ value + '<br>' +
                        'Local: ' + local + '<br>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }
    }

    if(gpioType === "analog")
    {
        sensor = sensor +
        '<div class="col-md-4">' +
            '<div class="panel panel-info">' +
                '<div class="panel-heading">' + name + '</div>' +
                '<div class="panel-body">' + value + '</div>' +
            '</div>' +
        '</div>';
    }

    $("#" + jQueryId + "").append(sensor);
};

var buildGuiBasedOnServerConfiguration = function(configuration)
{
    //console.log(configuration);
    var activeAreaId = $(".linkNavBar.active").attr('id');
    console.log(activeAreaId);

    $("#navBarLinksArea").html("");
    $("#allSensorAreaContent").html("");
    $(".notFixed").remove();

    var n = 0;
    configuration.areas.forEach(function(area)
    {
        //console.log(area.name);

        buildNavBar(area.name, n);
        n = n + 1;
    }.bind(this));

    for (var mac in configuration.devices)
    {
        for (var iface in configuration.devices[mac].iface)
        {
            //console.log(iface, configuration.devices[mac].iface);
            if(configuration.devices[mac].iface[iface].type === "sensor")
            {
                var name = configuration.devices[mac].iface[iface].name;
                var value = configuration.devices[mac].iface[iface].value;
                var gpioType = configuration.devices[mac].iface[iface].gpio;
                var local = configuration.devices[mac].iface[iface].local;

                buildSensorAreaContent(name, value, gpioType, local, "allSensorAreaContent");
            }
        }
    }

    var m = 0;
    configuration.areas.forEach(function(area)
    {
        var htmlCode = "";
        $("#" + 'sensor' + m + 'AreaContent').html("");

        htmlCode = htmlCode +
            '<div id="area' + m + 'Container" class="container sensorContainer notFixed">' +
                '<div class="panel panel-primary panel-transparent">' +
                    '<div class="panel-heading">' +
                        '<span id= "area' + m + 'Header" class="panel-title pull-left">FMQ WC - ' + area.name + '</span>' +
                        '<div class="pull-right"></div>' +
                        '<div class="clearfix"></div>' +
                    '</div>' +
                    '<div class="panel-body">' +
                        '<div id="sensor' + m + 'AreaContent"> ' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '';

        $("#mainWindow").append(htmlCode);


        area.devices.forEach(function(device)
        {
            var mac = device.mac;
            var iface = device.iface;
            //console.log("DEVICE = mac: " +  mac + " iface: " + iface);

            if(configuration.devices[mac].iface[iface].type === "sensor")
            {
                var name = configuration.devices[mac].iface[iface].name;
                var value = configuration.devices[mac].iface[iface].value;
                var gpioType = configuration.devices[mac].iface[iface].gpio;
                var local = configuration.devices[mac].iface[iface].local;

                buildSensorAreaContent(name, value, gpioType, local, 'sensor' + m + 'AreaContent');
            }
        });
        m = m + 1;
    });

    var activeAreaJqueryObj = $("#" + activeAreaId);
    if(activeAreaJqueryObj.length == 0)
    {
        //just incase some area disapears
        $("#allSensor").addClass("active");
    }
    else
    {
        activeAreaJqueryObj.addClass("active");
    }

    showTheActiveArea();
};

var buildActionsToAreaLinks = function(configuration)
{
    $('.linkNavBar').each(function()
    {
        //console.log($(this).attr('id'));
        $(this).on('click', function()
        {
            //console.log($(this).attr('id'));
            $(".linkNavBar").removeClass("active");
            $("#" + $(this).attr('id') + "").addClass("active");
            showTheActiveArea();
        })
    });

};

var showTheActiveArea = function()
{
    var activeAreaId = $('.linkNavBar.active').attr('id') + "Container";
    $(".sensorContainer").hide();
    $("#" + activeAreaId).show();
};

var startSocketIoConnection = function()
{
	var socket = io.connect('http://localhost:8080');
	
	socket.on('connect', function (data) 
  	{
  		//console.log("socketIO Connected");
  	});
  	
  	socket.on('disconnect', function (data) 
  	{
	  	//console.log("socketIO Disconnected");
	  	resetGui();
  	});
  	
  	socket.on('error', function (data) 
  	{
  		//console.log("socketIO error");
	  	resetGui();
  	});
	
  	socket.on('notification', function (data) 
  	{
        resetGui();
        showMainWindow();
        var configuration = JSON.parse(data);
        buildGuiBasedOnServerConfiguration(configuration);
        buildActionsToAreaLinks(configuration);
  	});   
};

var randomWallPaper = function()
{
    var images = ['1', '2', '3', '4', '5'];
    $('body').css({'background-image': 'url(images/wallpaper/wall_' + images[Math.floor(Math.random() * images.length)] + '.jpg)'});
};
