/**
 * Created by edu on 10-02-2016.
 */

'use strict';


var loginInit = function()
{
    //console.log("loginInit");
    loginGuiBindingInit();
    loginResetGui();

};

var loginGuiBindingInit = function()
{
    $("#loginModal_LoginButton").click(function()
    {
        doLogIn();
    });

    $("#userInfoButton").click(function()
    {
        showUserInfo();
    });

    $("#logoutButton").click(function()
    {
        doLogOut();
    });

    $('#loginModal_userName').keypress(function(event)
    {
        if (event.keyCode == 13 || event.which == 13)
        {
            $('#loginModal_password').focus();
            event.preventDefault();
        }
    });

    $('#loginModal_password').keypress(function(event)
    {
        if (event.keyCode == 13 || event.which == 13)
        {
            doLogIn();
        }
    });

    $('#loginModal_loginForm').submit(function()
    {
        event.preventDefault();
    });

    $('#userInfoModal_editButton').click(function()
    {
        editUserData()
    });

    $('#userInfoModal_cancelButton').click(function()
    {
        cancelUserDataEdit();
    })
};

var loginResetGui = function()
{
    $('#userInfoButton').hide();
};

var wrongLogin = function()
{
    $("#loginModal").modal('show');
    $('#userInfoButton').hide();
};

var doLogIn = function()
{
    var userMail = $('#loginModal_userName').val();
    var password = $('#loginModal_password').val();
    //var rememberMe = $('#loginModal_rememberMe').val();
    var rememberMe = false;

    //console.log("userMail: " + userMail + " password: " + password + " rememberMe: " + rememberMe);
    //console.log("pass md5: " + passwordMD5);

    currentUser.setUserData(userMail, password);
    var loginJsonObj = currentUser.getJsonUser();

    $.ajax({
        method: "GET",
        url: "/login",
        data: {
            loginObj: loginJsonObj
        },

        success: function(res)
        {
            var resOBJ = JSON.parse(res);

            if(resOBJ.auth == true)
            {
                //console.log("Login ok");
                currentUser.updateUserData(resOBJ.userData, rememberMe);
                $("#loginModal").modal('hide');
                $('loginModal_loginForm').submit();
                showUserInfoButton(resOBJ.userData.userName);
                fillUserDataOnUserInfoModal(resOBJ.userData);
            }
            else
            {
                //console.log("Login NOT ok");
                currentUser.clearUserData();
                wrongLogin();
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

var doLogOut = function()
{
    currentUser.clearUserData();
    $('#loginModal_userName').val("");
    $('#loginModal_password').val("");
    $("#loginModal").modal('show');
};

var showUserInfoButton = function(userName)
{
    $('#userInfoButton').html(userName).show();
};

var showUserInfo = function()
{

    $("#userInfoModal").modal('show');
};
var hideUserInfo = function()
{
    $("#userInfoModal").modal('hide');
};

var fillUserDataOnUserInfoModal = function(userData)
{
    $('#userInfoModal_editEmail').html(userData.userMail);
    $('#userInfoModal_editUserName').html(userData.userName);
    $('#userInfoModal_editTeam').html(userData.team);
};

var editUserData = function()
{
    var newPassword = $('#userInfoModal_newPassword').val();
    var newRepeatPassword =  $('#userInfoModal_repeatNewPassword').val();
    var oldPassword = $('#userInfoModal_oldPassword').val();

    //console.log("newPassword: " + newPassword);
    //console.log("newRepeatPassword: " + newRepeatPassword);
    //console.log("oldPassword: " + oldPassword);

    if( newPassword != newRepeatPassword)
    {
        hideUserInfo();
        showWarning("Password error:", "New password and the repeat new password fields are different from each other. ");
    }
    else
    {
        var tempUser = new User();
        tempUser.userMail = currentUser.userMail;
        tempUser.passwordMD5 = calcPasswordMD5(newPassword);
        tempUser.userName = currentUser.userName;
        tempUser.userNumber= currentUser.userNumber;
        tempUser.team = currentUser.team;

        var userDataJsonObj = tempUser.getJsonUser();
        $.ajax({
            method: "GET",
            url: "/editUser",
            data: {
                userMail: JSON.stringify(currentUser.userMail),
                passwordMD5: JSON.stringify(calcPasswordMD5(oldPassword)),
                userNewDataJsonObj: userDataJsonObj
            },

            success: function(res)
            {
                var resOBJ = JSON.parse(res);
                console.log(resOBJ);

                if(resOBJ.updated)
                {
                    hideUserInfo();
                    showSuccess("Password changed:", "Your new password was set.");
                }
                else
                {
                    hideUserInfo();
                    showWarning("Password error:", "Your new password was not changed.");
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
    }
};

var cancelUserDataEdit = function()
{
    resetUserEditModal();
    hideUserInfo();
};

var resetUserEditModal = function()
{
    //TODO Clear all inputs of the edit user GUI
};
