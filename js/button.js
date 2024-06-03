$(function () {
    $(document).on('click', '.gnb_link', function (e) {
        if (fn.exists('.page_main') && fn.exists($(e.currentTarget).parent('.gnb_destination'))) {
            e.preventDefault();
            let target = e.currentTarget;
            let index = $(target).parent('.gnb_item').index();

            $('.gnb_item').removeClass('active');
            $('.gnb_item').eq(index).addClass('active');
            $('.aside_area').removeClass('active');
            fn.removeHidden();
        }
    });
    $(document).on('click', '.btn_aside', function (e) {
        fn.addHidden();
        $('.aside_area').addClass('active');
    });
    $(document).on('click', '.modal_open', function (e) {
        e.preventDefault();
        var target = $(this).data("target");
        fn.modalOpen(target);
    });
    $(document).on('click', '.aside_dim, .aside_area .btn_close', function (e) {
        $('.aside_area').removeClass('active');
        fn.removeHidden();
    });
    $(document).on('click', '.modal_close', function (e) {
        e.preventDefault();
        $(this).parents(".modal_area").find('.modal_box').removeClass('active');
        $(this).parents(".modal_area").removeClass("active");
        fn.removeHidden();
    });
    $(document).on('click', '.modal_area', function (e) {
        if ($(e.target).parents('.modal_centered').length < 1 && $('.modal_area.active').attr('data-dim-click') !== 'false') {
            $(this).find('.modal_box').removeClass('active');
            $(this).removeClass("active");
            fn.removeHidden();
        }
    });
    $(document).keyup(function (e) {
        if (e.which == '27' && $('.modal_area.active').length) {
            let target = $('.modal_area.active');
            $(target).find('.modal_box').removeClass('active');
            $(target).removeClass('active');
            fn.removeHidden();
        } else if (e.which == '27') {
            $('.aside_area').removeClass('active');
        }
    });
    $(document).on('click', '.frequently_area', function (e) {
        e.preventDefault();
        let el = e.currentTarget;
        $(el).parents('.faq_item').toggleClass('active');
        $(el).parents('.faq_item').find('.questions_area').stop().slideToggle(450);
    });
    $(document).on('click', '.btn_alert', function (e) {
        e.preventDefault();
        alert('준비 중 입니다.');
    });
    $(document).on('click', '.subscribe_area .form_btn', function (e) {
        let el = e.currentTarget;
        $(el).parents('.form_group').addClass('invaild')
    });
});