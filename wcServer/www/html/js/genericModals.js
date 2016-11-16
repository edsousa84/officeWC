/**
 * Created by edu on 03-03-2016.
 */

var showWarning = function(title, message)
{
    $('#warningModal_title').html(title);
    $('#warningModal_message').html(message);
    $('#warningModal').modal('show');
};

var showSuccess = function(title, message)
{
    $('#successModal_title').html(title);
    $('#successModal_message').html(message);
    $('#successModal').modal('show');
};