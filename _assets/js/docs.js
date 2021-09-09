$(document).ready(function() {
    // Docs sidebar accordion
    $('.docs__nav-toggle').click(function(e){
        (e).preventDefault();
        var nav = $('.docs__nav');
        var item = $(this).parent();
        var dropdown = $(item).find('.docs__nav-dropdown');

        // Open dropdown of clicked item
        if($(item).hasClass('docs__nav-item--active')){
            $(dropdown).slideToggle(function(){
                $(item).toggleClass('docs__nav-item--active');
            });
        } else {
            $(dropdown).slideToggle();
            $(item).toggleClass('docs__nav-item--active');
        }

        // Close already opened elements
        $(nav).find('.docs__nav-item--active').not(item).each(function(){
            $(this).find('.docs__nav-dropdown').slideToggle();
            $(this).removeClass('docs__nav-item--active');
        });
    });

    // Table of contents -- Fill list with links to h2 headlines
    $('.docs__content h2').each(function(){
        // Get the h2 element attributes from DOM and create li element with link to it
        var id = $(this).attr('id');
        var label = $(this).text();
        var element = $('<li class="docs__toc-item"><a href="#'+ id +'" class="docs__toc-link">'+ label +'</a></li>' );
        
        // Specify list in DOM
        var toc = $('.docs__toc-list');

        // Append each created element to the list
        $(element).appendTo(toc);
    });

    // Table of contents -- Smooth scroll to ID 
    $('.docs__toc-link').click(function(e){

        e.preventDefault();
        var nav = $('.docs__toc-list');
        var item = $(this).parent();

        // target element
        var id = $(this).attr('href');
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        
        // Add active class to parent element (li)
        $(item).toggleClass('docs__toc-item--active');
        
        // Remove active class from rest of the elements
        $(nav).find('.docs__toc-item--active').not(item).each(function(){
            $(this).removeClass('docs__toc-item--active');
        });

        // Top position relative to the document
        var pos = $id.offset().top - 128;

        // Animated top scrolling
        $('body, html').animate({scrollTop: pos});

    });
    

    // Table of contents -- Scrollspy (change active class on scroll)
    var headlines = $('.docs__content').find('h2');

    // Iterate through all headlines and set scrollspy function on them
    headlines.each(function(index) {

        // Get the position of current headline
        var position = $(this).position();
        
        // Get the position of the next headline to set sectionHeight
        if(index !== headlines.length - 1) {
            var sectionHeight = headlines.eq(index + 1).position().top;
        } else {
            var sectionHeight = position.top + $(this).height()
        }

        // Add scrollspy to the current headline
        $(this).scrollspy({
            min: position.top,
            max: sectionHeight,
            onEnter: function(element) {
                // Add 'active' class to element visible on viewport
                var item = $('a[href="#' + element.id + '"]').parent();
                $(item).addClass('docs__toc-item--active');

                // Remove active class from items previously labeled as active
                $('.docs__toc-list').find('.docs__toc-item--active').not(item).each(function(){
                    $(this).removeClass('docs__toc-item--active');
                });
            }
        });
    });
});