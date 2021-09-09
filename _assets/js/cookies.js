// Set cookie expiry date
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

$(document).ready(function() {
    // Define variables
    var widget = $('.cookie-consent');
    var widgetButton = $('.cookie-consent__button');
    var expiryLength = $(widget).attr("data-expire");
    var cookie = getCookie('bytewaxCookieConsent');

    // Check if cookie was already set
    if (cookie == '') {
        widget.fadeIn();
    } else {
        widget.hide();
    }

    // Hide widget on button click
    widgetButton.click(function(){
        setCookie('bytewaxCookieConsent', 'hide', expiryLength);
        $(widget).fadeOut();
    });
});