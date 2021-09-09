$(document).ready(function() {
    // Toggle navigation (tablet & mobile)
    $('.navbar__toggler').click(function(e){
        (e).preventDefault();
        var nav = $(this).parent().find('.navbar__nav');
        $('.navbar').toggleClass('navbar--open');
        $(this).toggleClass('navbar__toggler--open');
        if($(this).hasClass('navbar__toggler--open')){
            $(nav).css("display", "flex").hide().fadeIn();
        } else {
            $(nav).fadeOut();
        }
    });

    // Open / close dropdown menu on click
    $('.navbar__nav-link--dropdown').click(function(e){
        (e).preventDefault();

        // Toggle link class
        $(this).toggleClass('navbar__nav-link--dropdown-open');

        // Get dropdown element
        var dropdown = $(this).parent().find('.navbar__nav-dropdown');

        // If other dropdowns were already opened, close them
        $('.navbar__nav-dropdown--open').not(dropdown).each(function(){
            $(this).parent().find('.navbar__nav-link--dropdown').removeClass('navbar__nav-link--dropdown-open');
            $(this).fadeOut().removeClass('navbar__nav-dropdown--open');
        });
        
        // If link has specific class, open/close dropdown element
        if($(this).hasClass('navbar__nav-link--dropdown-open')){
            $(dropdown).fadeIn().addClass('navbar__nav-dropdown--open');
        } else {
            $(dropdown).fadeOut().removeClass('navbar__nav-dropdown--open');
        }

    });

    // Close already opened dropdowns while clicking outside
    $(document).click(function(e){
        if( (!$(e.target).hasClass('navbar__nav-link--dropdown')) && (!$(e.target).closest(".navbar__nav-dropdown").length > 0) ){
            $('.navbar__nav-dropdown--open').each(function(){
                $(this).parent().find('.navbar__nav-link--dropdown').removeClass('navbar__nav-link--dropdown-open');
                $(this).fadeOut().removeClass('navbar__nav-dropdown--open');
            });
        }
    });

    // Check local storage to get preferred colorMode
    var colorMode = localStorage.getItem('colorMode');
    if (colorMode == 'dark'){
        $('.navbar__switch').removeClass('navbar__switch--light').addClass('navbar__switch--dark');
    }

    // Toggle between dark & light mode
    $('.navbar__switch').click(function(e){
        (e).preventDefault();
        if ($(this).hasClass('navbar__switch--light')){
            $(this).removeClass('navbar__switch--light').addClass('navbar__switch--dark');
            $('body').addClass('dark-mode');

            // Set preferred color scheme in localStorage
            localStorage.setItem('colorMode', 'dark');
        } else {
            $(this).removeClass('navbar__switch--dark').addClass('navbar__switch--light');
            $('body').removeClass('dark-mode');
            
            // Set preferred color scheme in localStorage
            localStorage.setItem('colorMode', 'light');
        }
    });

    // Define navbar background (white & transparent) depending on scroll position
    if ($(window).scrollTop() >= $('.navbar').position(top)) {
        $('.navbar').removeClass('navbar--scroll'); 
    } else if ($(window).scrollTop() === 0){
        $('.navbar').removeClass('navbar--scroll'); 
    } else {
        $('.navbar').addClass('navbar--scroll');
    }
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 60) {
            $('.navbar').addClass('navbar--scroll');
        } else {
            $('.navbar').removeClass('navbar--scroll'); 
        }
    });
});