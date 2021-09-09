$(document).ready(function() {

    // Add counter to steps headlines
    var headlines = $('.tutorial__text').find('h2');
    headlines.each(function(i) {
        $(this).attr('data-count', i + 1);
    });

    // Handle switching between snippets tabs
    function switchSnippet(target){
        var tabs = $('.tutorial__snippets-tabs');
        var nav = $('.tutorial__snippets-nav');
        var navItem = nav.find('a[href="' + target + '"]').parent();
        
        // Check if item is not already active
        if (!$(navItem).hasClass('tutorial__snippets-nav-item--active')){
            // Add active class to selected item
            $(navItem).addClass('tutorial__snippets-nav-item--active');

            // Remove active class from already labeled items
            nav.find('.tutorial__snippets-nav-item--active').not(navItem).removeClass('tutorial__snippets-nav-item--active');
        }

        // Check if target element is not already active
        if (!$(target).hasClass('tutorial__snippets-tab--active')){
            // Add active class to selected tab (make it visible)
            $(target).addClass('tutorial__snippets-tab--active');

            // Remove active class from rest of tabs (hide them)
            tabs.find('.tutorial__snippets-tab--active').not(target).removeClass('tutorial__snippets-tab--active');
        }

        // Clear highlighted cells if needed
        $('.nb-cell--highlight').removeClass('nb-cell--highlight');
    }

    // Enable tab switch between snippet files on nav click
    $('.tutorial__snippets-nav-link').click(function(e){
        // Prevent browser from redirecting to target
        (e).preventDefault();

        // Get the link href / target & pass it into switchSnippet function
        var target = $(this).attr('href');
        switchSnippet(target);
    });

    // Highlight specific lines in code snippet
    function lineHighlight(target, lines){
        // Set the hash location path
        var path = target + '.' + lines;
        window.location.hash = path;
    }

    // Highlight specific cells in code snippet (notebook)
    function cellHighlight(target, cells){
        // Get DOM elements for provided arguments
        var notebookContainer = document.getElementById(target);
        var cellElement = $(notebookContainer).find('[data-cell="' + cells + '"]');
        
        // Add highlight class to selected cell
        $(cellElement).addClass('nb-cell--highlight');

        // Remove highlight class from previously selected
        $(notebookContainer).find('.nb-cell--highlight').not(cellElement).removeClass('nb-cell--highlight');

        // Set scroll position to match the cell
        var cellPosition = cellElement.offset().top;
        var containerPosition =  $(notebookContainer).offset().top;
        var position = cellPosition - containerPosition;
        if (position !== 0.625) notebookContainer.scrollTop = position;
    }

    // Switch active paragraph
    function switchParagraph(element, target){
        var paragraph;
        var allParagraphs = $('.tutorial__text').find('p');
        var prevButton = $('#prev');
        var nextButton = $('#next');
        var inactiveClass = 'tutorial__snippets-btn--inactive';

        // If paragraph is provided in arguments
        if (element !== undefined){
            paragraph = element;
        } 
        // If paragraph is not provided, use target
        else {
            // Get current active paragraph from DOM & its closest siblings
            var activeParagraph = $('.tutorial__text .highlight');
            var prevParagraph = $(activeParagraph).prevAll('p').eq(0);
            var nextParagraph = $(activeParagraph).nextAll('p').eq(0);

            if (target == 'prev'){
                // Switch to first paragraph
                if (activeParagraph.length && prevParagraph.length){
                    paragraph = prevParagraph;
                }
            } else if (target == 'next'){
                // Switch to next paragraph
                if (activeParagraph.length && nextParagraph.length){
                    paragraph = nextParagraph;
                }
                // Switch to first paragraph
                else if (!activeParagraph.length){
                    var firstParagraph = $('.tutorial__text p').first();
                    paragraph = firstParagraph;
                }
            }
        }

        // Check if paragraph is defined & wasn't already activated
        if (paragraph !== undefined && !paragraph.hasClass('highlight')){

            // Get paragraph attributes from DOM
            var lines = $(paragraph).attr('data-highlight');
            var cells = $(paragraph).attr('cell-highlight');
            var snippet = $(paragraph).attr('data-snippet');
            var snippetId = '#' + snippet;

            // If paragraph was not already selected, highlight it
            allParagraphs.not(paragraph).removeClass('highlight');
            paragraph.addClass('highlight');

            // Check if selected snippet is visible in active tab
            if($(snippetId).hasClass('tutorial__snippets-tab--active')){
                if(lines !== undefined){
                    // Highlight lines if provided
                    lineHighlight(snippet, lines);
                } else if (cells !== undefined){
                    // Highlight cells if provided
                    cellHighlight(snippet, cells);
                }
            } 
            // Check if snippet is provided in paragraph data
            else if (snippet !== undefined){
                // Change snippet tab first, then highlight lines
                $.when(switchSnippet(snippetId)).done(function() {
                    if(lines !== undefined){
                        // Highlight lines if provided
                        lineHighlight(snippet, lines);
                    } else if (cells !== undefined){
                        // Highlight cells if provided
                        cellHighlight(snippet, cells);
                    }
                });
            }

            // Get paragraphs closest siblings (active/inactive buttons)
            var prevElement = $(paragraph).prevAll('p').eq(0);
            var nextElement = $(paragraph).nextAll('p').eq(0);

            if (!prevElement.length){
                $(prevButton).addClass(inactiveClass);
            } else if (!nextElement.length){
                $(nextButton).addClass(inactiveClass);
            } else {
                $('.tutorial__snippets-btn').removeClass(inactiveClass);
            }
    
            // Set the scroll location (vertically centered)
            var elOffset = $(paragraph).offset().top,
            elHeight = $(paragraph).height(),
            windowHeight = $(window).height(),
            position;
            
            if (elHeight < windowHeight) {
                position = elOffset - ((windowHeight / 2) - (elHeight / 2));
            }
            else {
                position = elOffset;
            }
            
            // Animate to scroll position
            $('html, body').animate({ 
                scrollTop: position 
            }, 500);
        }
    }

    // Actions on keydown (up/down)
    $(document).keydown(function(e) {
        switch(e.which) {
            case 38: // When user press up
                switchParagraph(undefined, 'prev');
            break;

            case 40: // When user press down
                switchParagraph(undefined, 'next');
            break;
            
            default: return; 
        }
        e.preventDefault(); 
    });

    // Actions on paragraph click
    $('.tutorial__text p').click(function(){
        switchParagraph($(this));
    });

    // Actions on buttons click
    $('.tutorial__snippets-btn').click(function(){
        var id = $(this).attr('id').toString();
        switchParagraph(undefined, id);
    });

    // Change background after clicking 'copy' button
    $(document).on("click", ".copy-to-clipboard-button", function () {
        var snippet = '.tutorial__snippets-tab--active';
        var timeout = 1000;
        var onClickClass = 'tutorial__snippets-tab--highlight';

        // Add class immediately after click
        $(snippet).addClass(onClickClass);

        // Remove class after timeout period
        setTimeout(function() {
            $(snippet).removeClass(onClickClass);
        }, timeout);
    });

    // Add jupyter notebook rendering using notebook.js
    // https://github.com/jsvine/notebookjs
    $('.tutorial__snippets-tab--notebook').each(function() {
        // Get the path to notebook file from data-attribute
        var tab = $(this);
        var path = tab.attr("data-src");
        
        // Fetch file from provided path
        fetch(path).then(response => response.text()).then(data => {
            // Use notebook.js to parse & render file
            var ipynb = JSON.parse(data);
            var notebook = nb.parse(ipynb);
            var rendered = notebook.render();

            // Add rendered output to the tab
            $(tab).append(rendered);
            
            // Rerun Prism syntax highlighting on the current page
            Prism.highlightAll();

            // Add data-cell attribute to each cell in rendered notebook
            $('.nb-cell').each(function(i) {
                $(this).attr('data-cell', i + 1);
            });
        });
    });

});