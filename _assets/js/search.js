$(document).ready(function(){
    /** Initialize SJS plugin (simple-jekyll-search.js) */
    if ($('.docs').length > 0){
        var sjs = SimpleJekyllSearch({
            searchInput: document.getElementById('search-input'),
            resultsContainer: document.getElementById('results-container'),
            json: '/search.json',
            searchResultTemplate: '<li class="docs__search-results-item"><a class="docs__search-results-link" href="{url}">{title}</a></li>',
            noResultsText:'<li class="docs__search-results-item docs__search-results-item--blank">No results found</li>'
        });
    }
});