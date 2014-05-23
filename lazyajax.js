/**
 * lazyajax v1.0
 * Author : lohith
 */
;(function ($,window,document,undefined) {
    $.initLazyAjax = function () {
        var inViewPort = function (elem) {
            var viewportWidth = $(window).width(),
                viewportHeight = $(window).height(),

                documentScrollTop = $(document).scrollTop(),
                documentScrollLeft = $(document).scrollLeft(),

                minTop = documentScrollTop,
                maxTop = documentScrollTop + viewportHeight,
                minLeft = documentScrollLeft,
                maxLeft = documentScrollLeft + viewportWidth,

                $targetElement = $(elem),
                elementOffset = $targetElement.offset();
            if (
                (elementOffset.top > minTop && elementOffset.top < maxTop) &&
                (elementOffset.left > minLeft &&elementOffset.left < maxLeft)
                ){
                    return true;
                 } 
            else {
                    return false;
                 }
        }
        var load = function (container) {
            var loadUrl = $(container).data('loadurl');
            if(!loadUrl) {
                console.log('loadurl not found');
                return;
            }
            $.ajax({url : loadUrl}).done(function (response) {
                $(container).html(response);
            });
        }
        var loadViewPort = function () {
            var loadList = $('.lazyajax').not('.loadcompleted');
            if(!loadList[0]){
                $(window).unbind('scroll');
            }
            loadList.each(function(index,container){
                if(inViewPort(container)){
                    load(jQuery(container));
                    $(container).addClass('loadcompleted');
                }
            });
        }
        var registerLazyLoad = function () {
            $(window).bind("scroll", function() {
                loadViewPort();
            });
        }
        loadViewPort();
        registerLazyLoad();
    }
}(jQuery,window,document));