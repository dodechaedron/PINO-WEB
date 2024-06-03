$(function () {
    fn.init();
    let fullpageProt = true;
    let tokenTl = gsap.timeline();
    let tokenProt = true;
    if (fn.exists('#fullpage')) {
        gsap.config({
            nullTargetWarn: false,
        });
        $('#fullpage').fullpage({
            // navigation: true,
            autoScrolling: true,
            keyboardScrolling: true,
            css3: true,
            // responsiveHeight: 600,
            scrollOverflow: true,
            afterRender: function () {
                let $gsapMotion = document.querySelectorAll('.gsap_motion');
                $gsapMotion.forEach((item, index) => {
                    let $itemParent = $(item).parents('.fp-section'),
                        parentIndex = $($itemParent).index(),
                        activeIndex = $('.fp-section.active').index(),
                        item_vh = Number($(item).attr('data-gsap-vh'));

                    if (parentIndex > activeIndex) {
                        motion_origin(item, -item_vh, 1, 0);
                    } else if (parentIndex < activeIndex) {
                        motion_origin(item, item_vh, 1, 0);
                    }
                });
            },
            onLeave: function (origin, destination, direction) {
                if(destination === 2 && fn.exists('.page_main')){
                    let video = document.getElementById('videoNFT');
                    video.load();
                    video.play();
                }
                direction == 'down' ? $('.header').addClass('active') : $('.header').removeClass('active');
                origin--;
                destination--;
                let $gsapMotion = document.querySelectorAll('.gsap_motion');
                $gsapMotion.forEach((item, index) => {
                    let $itemParent = $(item).parents('.fp-section'),
                        parentIndex = $($itemParent).index(),
                        item_vh = Number($(item).attr('data-gsap-vh')),
                        item_duration = Number($(item).attr('data-gsap-duration')),
                        item_delay = Number($(item).attr('data-gsap-delay'));

                    if ( parentIndex < destination){
                        motion_origin(item, item_vh, item_duration, item_delay);
                    } else if( parentIndex > destination){
                        motion_origin(item, -item_vh, item_duration, item_delay);
                    } else {
                        motion_destination(item, -item_vh, item_duration, item_delay);
                    }
                });

                if (fn.exists('.page_main')){
                    $('.gnb_item').removeClass('active');
                    let length = $('.gnb_item').length / 2;
                    let gnb_length = $('.gnb_destination').length / 2 + 1;
                    if (destination == 0 || destination > gnb_length) {
                        return;
                    } else if (destination <= 2) {
                        $('.gnb_item').eq(0).addClass('active');
                        $('.gnb_item').eq(0+ length).addClass('active');
                    } else {
                        $('.gnb_item').eq(destination - 2).addClass('active');
                        $('.gnb_item').eq(destination - 2 + length).addClass('active');
                    }
                    
                    if(destination === 4){
                        tokenProt ? tokenGsap() : tokenTl.restart();
                    }
                    if(destination === 5){
                        $('.scale_dim').addClass('active')
                        roadGsap();
                    }
                }
            },
        });
        function motion_origin(target, vh = 0, duration = 0, delay = 0) {
            gsap.to(
                target,
                {
                    transform: `translateY(${vh}vh)`,
                    duration: duration,
                    delay: delay
                }
            );
        }
        function motion_destination(target, vh = 0, duration = 0, delay = 0) {
            gsap.to(
                target,
                {
                    transform: `translateY(0)`,
                    duration: duration,
                    delay: delay
                }
            );
        }
    }
    if (fn.exists('.page_main')) {
        $(document).on('click', '.logo a', function (e) {
            e.preventDefault();
            $.fn.fullpage.moveTo(1, 0);
        });
        $(document).on('click', '.gnb_link', function (e) {
            let target = e.currentTarget;
            let index = $(target).parent('.gnb_item').index();
            if ( fn.exists($(e.currentTarget).parent('.gnb_destination')) ){
                e.preventDefault();
                $('.gnb_item').removeClass('active');
                if (index == 0) {
                    $.fn.fullpage.moveTo(2, 0);
                } else if(index < 5) {
                    $.fn.fullpage.moveTo(index + 3, 0);
                }
            }
        });

        var swiper_gamePlay = new Swiper(".slider_game_play", {
            speed : 1000,
            navigation: {
                nextEl: ".slider_game_play .swiper-button-next",
                prevEl: ".slider_game_play .swiper-button-prev",
            },
            scrollbar: {
                el: ".slider_game_play_wrap .swiper-scrollbar",
                draggable: true,
            },
            on: {
                init: function () {
                    scale();
                },
            },
            observer: true,
            observeParents: true,
        });

        var swiper_nft = new Swiper(".slider_nft", {
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
            speed : 850,
            navigation: {
                nextEl: ".slider_nft_wrap .swiper-button-next",
                prevEl: ".slider_nft_wrap .swiper-button-prev",
            },
            scrollbar: {
                el: ".slider_nft_wrap .swiper-scrollbar",
                draggable: true,
            },
            breakpoints: {
                1600: {
                    slidesPerView: 5,
                    slidesPerColumn: 3,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: 'column',
                },
                992: {
                    slidesPerView: 4,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: 'column',
                },
            },
            observer: true,
            observeParents: true,
        });

        flipHover();
        function flipHover() {
            $(".slider_nft .card").click(function(e){
                e.preventDefault();
                $(this).parents('.swiper-slide').siblings('.swiper-slide').find('.card').removeClass("hover");
                if($(this).hasClass("hover")){
                    $(this).removeClass("hover");
                } else {
                    $(this).addClass("hover");
                }
                if ($("body").hasClass("aos-device") || $("body").hasClass("ios-device")){
                }
            });
        }

    }

    $(window).resize(function () {
        scale();
    });

    $(window).on('load', function(){
        scale();
    });

    function scale() {
        $('.scale_each').each(function (index, item) {
            setTimeout(function () {
                let wrap = fn.getTargetWidth($(item).find('.scale_wrap'));
                let inner = fn.getTargetWidth($(item).find('.scale_inner'));
                let scale = wrap / inner;
                $(item).find('.scale_inner').css({ 'transform': `translate(-50%,-50%) scale(${scale})` });
            }, 10)
        });
    }

    function roadGsap() {
        let $scaleDim = $('.roadmap_area .scale_dim');
        let $stepItem = $('.roadmap_area .step_item');
        gsap.killTweensOf ( $scaleDim );
        gsap.killTweensOf ( $stepItem );
        let delayNum = 0.2;
        $('.roadmap_box .img_area .img').removeClass('active');
        setTimeout(() => {
            $('.roadmap_box .img_area .img').addClass('active');
        }, 10);
        if(!matchMedia("screen and (max-width: 730px)").matches){
            gsap.fromTo(
                $scaleDim,
                {
                    transform: `scaleX(1)`
                },
                {
                    transform: `scaleX(0)`,
                    duration: 2,
                    delay:0,
                    ease: 'linear'
                }
            );
        } else {
            gsap.fromTo(
                $scaleDim,
                {
                    transform: `scaleY(1)`
                },
                {
                    transform: `scaleY(0)`,
                    duration: 2,
                    delay:0,
                    ease: 'linear'
                }
            );
        }

        $stepItem.each((index,item)=>{
            gsap.fromTo(
                item,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 2.5,
                    delay:(0 + index*delayNum)
                }
            );
            gsap.fromTo(
                item,
                {
                    transform: `translateX(-50%) translate3d(-50px,0,0)`
                },
                {
                    transform: `translateX(-50%) translate3d(0,0,0)`,
                    duration: 1.3,
                    delay:(0 + index*delayNum)
                }
            );
        });
  
    }
    function tokenGsap() {
        tokenProt = false;
        let $tokenScaleWrap = $('.token_area .scale_wrap'),
            $txt1 = $('.token_area .scale_inner > .txt').eq(0),
            $txt2 = $('.token_area .scale_inner > .txt').eq(1),
            $txt3 = $('.token_area .scale_inner > .txt').eq(2),
            $group1 = $('.token_area .scale_inner .group1'),
            $group2 = $('.token_area .scale_inner .group2'),
            $group3 = $('.token_area .scale_inner .group3'),
            $group4 = $('.token_area .scale_inner .group4'),
            $group4_img= $('.token_area .scale_inner .group4 .img'),
            $group5 = $('.token_area .scale_inner .group5'),
            $group5_img = $('.token_area .scale_inner .group5 .img'),
            $group6 = $('.token_area .scale_inner .group6'),
            $group6_img = $('.token_area .scale_inner .group6 .img'),
            $arw1 = $('.token_area .scale_inner .arw1'),
            $arw2 = $('.token_area .scale_inner .arw2'),
            $arw3 = $('.token_area .scale_inner .arw3'),
            $arw4 = $('.token_area .scale_inner .arw4'),
            $arw5 = $('.token_area .scale_inner .arw5'),
            $box = $('.token_area .scale_inner .box');

        tokenTl.fromTo(
            $tokenScaleWrap,
            {
                opacity:0
            },
            {
                opacity:1,
                duration: 0.45,
                delay:0.65
            }
        )
        tokenTl.addLabel('flag1').fromTo(
            $box,
            {
                rotation: -120
            },
            {
                rotation: 0,
                duration: 1.5,
                ease: 'linear'
            },
            'flag1'
        ).fromTo(
            [$group1,$group2,$group3],
            {
                rotation: 120
            },
            {
                rotation: 0,
                duration: 1.5,
                ease: 'linear'
            },
            'flag1'
        ).fromTo(
            [$arw2,$arw3],
            {
                scale: 1
            },
            {
                scale: 1.1, 
                repeat: 3, 
                repeatDelay:0, 
                yoyo: true,
                duration: 0.25,
            }
        ).fromTo(
            [$group4_img,$group5_img],
            {
                scale: 1
            },
            {
                scale: 1.1, 
                repeat: 3, 
                repeatDelay:0, 
                yoyo: true, 
                duration: 0.25,
            }
        ).fromTo(
            [$arw4,$arw5],
            {
                scale: 1
            },
            {
                scale: 1.1, 
                repeat: 3, 
                repeatDelay:0, 
                yoyo: true,
                duration: 0.25
            }
        ).fromTo(
            [$group6_img],
            {
                scale: 1
            },
            {
                scale: 1.1, 
                repeat: 3, 
                repeatDelay:0, 
                yoyo: true,
                duration: 0.25
            }
        );

    }
    if (fn.exists('.page_game')) {
        $('html, body').addClass('full');
    }
    
});
