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
    randomWallPaper();
};

var randomWallPaper = function()
{
    var images = ['1', '2', '3', '4', '5'];
    $('body').css({'background-image': 'url(images/wallpaper/wall_' + images[Math.floor(Math.random() * images.length)] + '.jpg)'});
};