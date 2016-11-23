/**
 * Created by edu on 10/02/16.
 */

'use strict';


var fs = require('fs');

function Configuration()
{
    this.mac = "";
    this.iface = "";
    this.lastcontime = "";
    this.timeoutTime = 0;
    this.local = '';

}

function IFace()
{
    this.type = "";
    this.gpio = "";
    this.addr = "";
    this.value = 0;
}

function ConfigurationDB()
{
    this.file = "db/configurationDB.json";
    this.configuration = {};

    console.log("##############" + "# ConfigurationDB #" + "############");
    this.checkDBFile();
    this.readDBFile();
    console.log("##############" + "##############" + "############");
}

ConfigurationDB.prototype.checkDBFile = function()
{
    console.log("#\tChecking " + this.file + " for a DB");
    try
    {
        var stats = fs.lstatSync(this.file);

        if (stats.isFile())
        {
            if(stats["size"] < 0)
            {
                this.createEmptyFile()
            }
        }
        else
        {
            this.createEmptyFile()
        }
    }
    catch (e)
    {
        this.createEmptyFile()
    }
};

ConfigurationDB.prototype.readDBFile = function()
{
    console.log("#\tReading " + this.file + "");
    this.configuration = {};
    try
    {
        var fileContents = fs.readFileSync(this.file, 'utf8');
        //console.log("Configuration fileContents: ", fileContents);
        this.configuration = JSON.parse(fileContents);
        return 1;
    }
    catch(e)
    {
        console.log(e);
        this.configuration = {};
        return -1;
    }

    //console.log("configuration: ", this.configuration);
};

ConfigurationDB.prototype.createEmptyFile = function()
{
    console.log("#\tCreating a empty " + this.file + "");
    fs.openSync(this.file, 'w');
    fs.appendFileSync(this.file, '[]');
};

ConfigurationDB.prototype.getConfigurationJson = function()
{
    return JSON.stringify(this.configuration, null, 4);
};

ConfigurationDB.prototype.getConfigurationArray = function()
{
    return this.configuration;
};

ConfigurationDB.prototype.setDeviceIfaceValue = function(mac, iface, value)
{
    this.configuration.devices[mac].iface[iface].value = value;
};

ConfigurationDB.prototype.getDeviceIfaceValue = function(mac, iface)
{
    return this.configuration.devices[mac].iface[iface].value;
};

ConfigurationDB.prototype.getActuatorsOfSensor = function(mac, iface)
{
    return this.configuration.devices[mac].iface[iface].actuators;
};

ConfigurationDB.prototype.setSensorValue = function(mac, iface, value)
{
    if(this.configuration.devices[mac].iface[iface].type == "sensor")
    {
        this.setDeviceIfaceValue(mac, iface, value);
        return 1;
    }
    return -1;
};

ConfigurationDB.prototype.setActuatorValue = function(mac, iface, value)
{
    if(this.configuration.devices[mac].iface[iface].type == "actuator")
    {
        this.setDeviceIfaceValue(mac, iface, value);
        return 1;
    }
    return -1;
};

ConfigurationDB.prototype.setActuatorsValue = function(actuators, value)
{

    actuators.forEach(function(actuator)
    {
        var mac = actuator.mac;
        var iface = actuator.iface;

        this.setActuatorValue(mac, iface, value);
    }.bind(this));
};

ConfigurationDB.prototype.getActuatorValue = function(mac, iface)
{
    if(this.configuration.devices[mac].iface[iface].type == "actuator")
    {
        return this.getDeviceIfaceValue(mac, iface);
    }
};

module.exports = new ConfigurationDB();