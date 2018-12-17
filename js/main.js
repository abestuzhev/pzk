var windowWidth = (window.innerWidth ); // вся ширина окна
var documentWidth = (document.documentElement.clientWidth ); // ширина минус прокрутка

/*выравнивание ячеек по высоте*/
function equalheight(container){
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {
        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;
        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0;
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

function showPopup(icon, popup) {
    $(document).on('click', icon, function (e) {
        var $html = $('html');
        e.preventDefault();
        $(popup).addClass('is-visible');
        $('.mfp-bg').addClass('is-visible');


        $html.addClass('lock-html');
        $('body').addClass('fixed-input');
        if(windowWidth > documentWidth){
            $html.css({
                'margin-right':'17px'
            });
            $('.mfp-wrap').css({
                'overflow-y':'scroll'
            });
            // console.log('Есть полоса прокрутки');
        }else {
            // console.log('Нет полосы прокрутки');
        }
    });
}

$(function(){

    var widthWindow = $(window).width();

    $('.portfolio-list').slick({
        infinite: true
    });

    $('.reviews-list').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.news-list').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true
                }
            }
        ]
    });

    $("#credit-range").ionRangeSlider({
        skin: "big",
        grid: true,
        min: 500000,
        max: 10000000,
        from: 100000,
        step: 10000,
        prettify_enabled: true,
        prettify_separator: " "
    });

    $("#credit-term").ionRangeSlider({
        skin: "big",
        grid: true,
        min: 3,
        max: 240,
        from: 3,
        step: 1
    });

    $('#credit-range').on('change', function(){
        // var valRange = $(this).data("ionRangeSlider");
        var valRange = $(this).val();
        $(this).siblings('.calculator-range__result').find('.calculator-range__num').html(valRange);

    });

    $('#credit-term').on('change', function(){
        // var valRange = $(this).data("ionRangeSlider");
        var valRange = $(this).val();
        $(this).siblings('.calculator-range__result').find('.calculator-range__num').html(valRange);
        var creditTerm = $("#credit-term").data("ionRangeSlider");

        if(valRange > 12){
            valRange = valRange / 12;
            $(this).siblings('.calculator-range__result').find('span').html(valRange);
            $(this).siblings('.calculator-range__result').find('.calculator-range__unit').html('лет');


            // creditTerm.update({
            //     step:12
            // });
        }else {
            $(this).siblings('.calculator-range__result').find('.calculator-range__unit').html('мес.');
            // creditTerm.update({
            //     step:1
            // });
        }

    });


    // $('.license-list').slick({
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //                 arrows: true
    //             }
    //         },
    //         {
    //             breakpoint: 640,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 arrows: true
    //             }
    //         }
    //     ]
    // });

    // function getSliderNews(){
    //     $('.news-list').slick({
    //         infinite: true,
    //         speed: 300,
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //         responsive: [
    //             {
    //                 breakpoint: 640,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //         ]
    //     });
    // }
    // function getSliderLicense(){
    //
    // }
    //
    // if( widthWindow <= 980){
    //     getSliderLicense();
    // }
    //
    // if( widthWindow <= 1024){
    //     getSliderNews();
    // }
    //
    // $('.news-list').slick('setPosition');
    // $('.license-list').slick('setPosition');
    //
    // $(window).on('resize orientationchange', function(){
    //     if( widthWindow <= 1024){
    //         getSliderNews();
    //         console.log('resize!!!');
    //         $('.news-list').slick('setPosition');
    //         $('.license-list').slick('setPosition');
    //     }
    //
    //     if( widthWindow <= 980){
    //         getSliderLicense();
    //     }
    // });


    $(document).on('click', '.header-mobile-btn', function(e){
        e.preventDefault();
        $('.header-menu').toggleClass('is-show');
    })
    


    $(window).on('load',function() {
        equalheight('.c-card-product');
    });
    $(window).resize(function(){
        equalheight('.c-card-product');
    });


    /*фильтр в каталоге*/
    $(document).on('click', '.c-card-filter__title', function(e){
        e.preventDefault();
        $(this).parents('.catalog-filter__item').siblings().find('.c-card-filter').removeClass('active');
        $(this).parents('.c-card-filter').toggleClass('active');
    });

    /*кастомные селекты*/
    // $('.c-select').SumoSelect();


    /**/

    /*простые табы*/
    $(document).on('click', '.tabs-menu a', function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(this).parents('.tabs-menu').parent().siblings('.tabs-content').find(".tabs-content__item").not(tab).css("display", "none");
        $(tab).fadeIn();
    });




    $(document).on('click', '.popup-close', function (e) {
        e.preventDefault();
        var $html = $('html');
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('lock-html');
        $('body').removeClass('fixed-input');


    });

    $(document).on('click', '.js-popup-close', function (e) {
        e.preventDefault();
        var $html = $('html');
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('lock-html');
        $('.wrapper').removeClass('fixed-input');

    });


    showPopup(".header-login__entry", '.popup-entry');
    showPopup(".header-login__reg", '.popup-reg');



});