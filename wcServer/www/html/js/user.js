/**
 * Created by edu on 11-02-2016.
 */

'use strict';


var User = function()
{
    this.userMail = "";
    this.passwordMD5 = "";

    this.userName = "";
    this.userNumber= 0;
    this.team = "";
};
var currentUser = new User();

User.prototype.setUserData = function(userMail, password, rememberMe)
{
    this.userMail = userMail;
    this.passwordMD5 = CryptoJS.MD5(password).toString();

    if(rememberMe = true)
    {
        this.storeCookies()
    }
};

User.prototype.updateUserData = function(userData, rememberMe)
{
    this.userMail = userData.userMail;
    this.passwordMD5 = userData.passwordMd5;

    this.userName = userData.userName;
    this.userNumber = userData.userNumber;
    this.team = userData.team;

    if(rememberMe = true)
    {
        this.storeCookies()
    }
};

User.prototype.clearUserData = function()
{
    this.userMail = "";
    this.passwordMD5 = "";
};

User.prototype.storeCookies = function()
{

};

User.prototype.getUser = function()
{
    return this;
};

User.prototype.getJsonUser = function()
{
    return JSON.stringify(this);
};

User.prototype.getUserMail = function()
{
    return this.userMail;
};

User.prototype.getPasswordMD5 = function()
{
    return this.passwordMD5;
};

var calcPasswordMD5 = function(password)
{
    return CryptoJS.MD5(password).toString();
};

