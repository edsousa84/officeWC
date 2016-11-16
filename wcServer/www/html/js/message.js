/**
 * Created by edu on 11-02-2016.
 */

'use strict';


var Message = function(userMail, passwordMD5, message, color, effect)
{
    this.message = message;
    this.color = color;
    this.effect = effect;
    this.userMail = userMail;
    this.passwordMD5 = passwordMD5;
    this.timeStamp = Date.now();
};

Message.prototype.getJsonMessage = function()
{
  return JSON.stringify(this);
};

