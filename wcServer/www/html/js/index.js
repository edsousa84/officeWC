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
	randomWallPaper();
	$("#noConnectionWindow").hide();
	$("#mainWindow").show();
};

var buildGuiBasedOnServerConfiguration = function(configuration)
{

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
        buildGuiBasedOnServerConfiguration(data);
    	console.log(data);
  	});   
};

var randomWallPaper = function()
{
    var images = ['1', '2', '3', '4', '5'];
    $('body').css({'background-image': 'url(images/wallpaper/wall_' + images[Math.floor(Math.random() * images.length)] + '.jpg)'});
};
