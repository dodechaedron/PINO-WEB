fn = {
    init: function () {
        fn.chkBrowser();
        fn.ie();
        $("#wrap").addClass("loaded");
        fn.headerFixed();
    },
    chkBrowser: function () {
        'use strict';
        if (/Android/i.test(navigator.userAgent)) {
            $("body").addClass("aos-device");
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            $("body").addClass("ios-device");
        } else {
            $("body").addClass("pc-device");
        }
        $(window).resize(function () {
            $("body").removeClass("pc-device");
            if (/Android/i.test(navigator.userAgent)) {
                $("body").addClass("aos-device");
            } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                $("body").addClass("ios-device");
            } else {
                $("body").removeClass("ios-device aos-device");
                $("body").addClass("pc-device");
            }
        });
    },
    exists : function(target){
        return ($(target).length > 0);
    },
    ie: function () {
        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            window.location = 'microsoft-edge:' + window.location;
            setTimeout(function () {
                window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
            }, 1);
        }
    },
    getScrollBarWidth : function(){
        if(!fn.exists('#fullpage')){
            $('body').append('<div id="fakescrollbar" style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>');
            fakeScrollBar = $('#fakescrollbar');
            fakeScrollBar.append('<div style="height:100px;">&nbsp;</div>');
            var w1 = fakeScrollBar.find('div').innerWidth();
            fakeScrollBar.css('overflow-y', 'scroll');
            var w2 = $('#fakescrollbar').find('div').html('html is required to init new width.').innerWidth();
            fakeScrollBar.remove();
            return (w1-w2);
        }
        return 0;
    },
    getWindowWidth: function(){
        return $(window).outerWidth() + fn.getScrollBarWidth() ;
    },
    getWindowHeight: function(){
        return $(window).outerHeight();
    },
    getTargetWidth: function(target){
        return $(target).outerWidth() + fn.getScrollBarWidth() ;
    },
    getTargetHeight: function(target){
        return $(target).outerHeight();
    },
    getScrollTop: function(target){
        return $(target).scrollTop();
    },
    getOffsetTop: function(target){
        return $(target).offset().top;
    },
    textCount: function(target){
        let characterCount = $(target).val().length,
            maximum = $(target).attr('maxlength');
        $(target).parents('.sec_group').find('.count_box .txt').text(`[${characterCount}자 / ${maximum}자]`)
        if ($(target).val().length > maximum) {
            $(target).val($(target).val().substring(0, maximum));
        }
    },
    headerFixed: function(){
        let scrollTop = $(document).scrollTop();
        if (scrollTop > 0) {
            $("#header").addClass("fixed");
        } else {
            $("#header").removeClass("fixed");
        }
    },
    getDate: function(date){
        let dayOfWeek = new Date(date).getDay();
        return dayOfWeek;
    },
    addHidden: function(){
        $('html, body').addClass("hidden");
        $('body').css("paddingRight", fn.getScrollBarWidth());
        $('body').on('scroll touchmove mousewheel', function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    },
    removeHidden: function(){
        if(!fn.exists('.aside_area.active')){
            $('html, body').removeClass("hidden");
            $('body').css("paddingRight",0);
            $('body').off('scroll touchmove mousewheel');
        }
    },
    modalOpen: function(target){
        fn.addHidden();
        
        $(target).addClass("active");
        setTimeout(function () {
            $(target).find(".modal_box").addClass("active");
        },10);
    }
}