$(function () {
    var $content = $('.content'),
        $window = $(window),
        $body   = $('body'),
        s

    if(!localStorage.getItem('visited'))
        localStorage.setItem('visited', 'true');
    else
        $window.scrollTop(500);

    function getContent(page) {
        $.get('/content' + page)
         .done(function (content) {
            $content.html(content);
            history.pushState({ page: page }, '', page);
            $body.attr('data-content', page.substring(1));

            if(s) s.refresh()
         })
         .error(function (xhr) {
            console.log(xhr);
         });
    }

    window.addEventListener("popstate", function(e) {
        e.preventDefault();
        getContent(e.state.page);
    });

    $('li:not(:first-child) a:not([target=_self])').click(function (e) {
        e.preventDefault();
        getContent($(this).attr('href'));
    });

    $('.spacer').css('height', $window.height())

    if('skrollr' in window)
        s = skrollr.init({ forceHeight: false })
});
