/**
 * Created by edu on 11-02-2016.
 */

'use strict';


var socketServer = null;

var messagesInit = function()
{
    //console.log("messagesInit");
    messagesGuiBindingInit();
    messagesResetGui();
    //getAllMessagesFromServerHttp();

    setUpServerConnection();
};

var messagesGuiBindingInit = function()
{
    $('#addMessageToPoolButton').click(function()
    {
        newMessage();
    });

    var onlynumbersJqueryObj =  $('.validchars');
    onlynumbersJqueryObj.on('keypress', function(e)
    {
        var a = [];
        var k = e.which;

        var i = 0;
        for (i = 32; i < 127; i++)
        {
            a.push(i);
        }
        if (!(a.indexOf(k)>=0))
        {
            e.preventDefault();
        }

        var numberValue = $(this).val();
        var maxLength = $(this).attr('maxlength');
        if (numberValue.length > maxLength-1)
        {
            $(this).val(numberValue.slice(0,maxLength));
            e.preventDefault();
        }

        var size = numberValue.length;
        if(size < 40)
        {
            $("#newMessageNumberOfChars").html(numberValue.length+1);
        }
        else
        {
            $("#newMessageNumberOfChars").html(40);
        }
    }).on('keydown', function(e) {
        if (e.keyCode==8 || e.keyCode==46)
        {
            var numberValue = $(this).val();
            var size = numberValue.length;
            if(size-1 >= 0)
            {
                $("#newMessageNumberOfChars").html(numberValue.length-1);
            }
            else
            {
                $("#newMessageNumberOfChars").html(0);
            }
        }
    });
};

var messagesResetGui = function()
{
    console.log("messagesResetGui");
    var resetTableBodyContent = "" +
        "<tr>" +
            "<td> 0 </td>" +
            "<td> - </td>" +
            "<td> - </td>" +
            "<td> - </td>" +
            "<td> - </td>" +
        "</tr>" +
        "";
    $('#messagePoolTable_Body').html(resetTableBodyContent);
};

var drawMessageTableFromArray = function(messageArray)
{
    console.log(messageArray);
    var htmlMessageTable = "";

    messageArray.forEach(function(message)
    {
        /*
         message: "I am a bird"
         messageNumber: 0
         timeStamp: 1234567890
         color: "#112AAF2"
         effect: "blink"
         userMail: "piu"
         */

        htmlMessageTable = htmlMessageTable + "" +
        "<tr>" +
        "<td>" + message.messageNumber + "</td>" +
        "<td>" + message.userMail + "</td>" +
        "<td>" +
        "   <div class='col-sm-1'>" +
        "       <div class=\"messageTableColorSquare\" style=\"background-color:" + message.color + "\">" + "</div>" +
        "   </div>" +
        "   <div class='col-sm-2'>" + message.color + "</div>" +
        "</td>" +
        "<td>" + message.effect + "</td>" +
        "<td>" + message.message + "</td>" +
        "</tr> " +
        "";
    });
    $('#messagePoolTable_Body').html(htmlMessageTable)
};

var addMessageToTable = function(message)
{
    //console.log(messageArray);
    var messageTableJQueryObj = $('#messagePoolTable_Body');
    var htmlMessageTable = messageTableJQueryObj.html();
    htmlMessageTable = htmlMessageTable + "" +
    "<tr>" +
    "<td>" + message.messageNumber + "</td>" +
    "<td>" + message.userMail + "</td>" +
    //"<td>" +
    //"   <div class='col-sm-1'>" +
    //"       <div class=\"messageTableColorSquare\" style=\"background-color:" + message.color + "\">" + "</div>" +
    //"   </div>" +
    //"   <div class='col-sm-2'>" + message.color + "</div>" +
    //"</td>" +
    //"<td>" + message.effect + "</td>" +
    "<td>" + message.message + "</td>" +
    "</tr> " +
    "</tr> " +
    "";
    messageTableJQueryObj.html(htmlMessageTable);
};

var getAllMessagesFromServerHttp = function()
{
    console.log("getMessagesFromServer");
    $.ajax({
        method: "GET",
        url: "/getMessages",
        data: {},

        success: function(data)
        {
            var res = JSON.parse(data);
            //console.log("Got messages ok");
            drawMessageTableFromArray(res)
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            if (textStatus === 'timeout'){
                console.log('Timeout error, please try again!');
            }else{
                console.log('An unknown error has occurred, please try again!' + errorThrown);
            }
        },
        timeout: 30000
    });
};

var newMessage = function()
{
    var message = $('#newMessageTextSelectorInput').val();
    var effect = $('#newMessageEffectSelector').val();
    var color = $('#newMessageColorSelector').val();
    var userMail = currentUser.getUserMail();
    var passwordMD5 = currentUser.getPasswordMD5();
    if(effect === "")
    {
        effect= "none"
    }

    //console.log(message);
    //console.log(userMail);

    if(message.length > 0)
    {

        //if effect is empty
        if(message.effect !== "")
        {
            if(message.color !== "")
            {
                var messageObj = new Message(userMail, passwordMD5, message, color, effect);
                var messageJsonObj = messageObj.getJsonMessage();
                sendMessageToServerHttp(messageJsonObj);
                //getAllMessagesFromServerHttp();
            }
            else
            {
                console.log("Message color must have a value");
            }
        }
        else
        {
            console.log("Message effect must have a value");
        }
    }
    else
    {
        console.log("Message must have at least one character");
    }
};

var sendMessageToServerHttp = function(messageObj)
{
    console.log("messageObj: " + messageObj);
    $.ajax({
        method: "GET",
        url: "/newMessage",
        data: {
            messageObj: messageObj
        },

        success: function(data)
        {
            var res = JSON.parse(data);
            if(res.result == true)
            {
                console.log("New message ok");
            }
            else
            {
                console.log(res.message);
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            if (textStatus === 'timeout'){
                console.log('Timeout error, please try again!');
            }else{
                console.log('An unknown error has occurred, please try again!' + errorThrown);
            }
        },
        timeout: 30000
    });
};

var setUpServerConnection = function()
{
    var serverURL = location.host;
    socketServer = io.connect('http://' + serverURL);

    socketServer.on('setAllMessages', setAllMessagesFromServerSocketIO.bind(this, socketServer));
    socketServer.on('newMessage', newMessageFromServerSocketIO.bind(this, socketServer));
};

var setAllMessagesFromServerSocketIO = function(socket, data)
{
    drawMessageTableFromArray(data)
};

var newMessageFromServerSocketIO = function(socket, data)
{
    addMessageToTable(data);
};

var getMessagesFromServerSocketIO = function()
{
    socketServer.emit('')
};
