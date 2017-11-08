$(document).ready(function() {
    //低版本IE兼容
    isLowIE() && lowIeSupport();

    /*
        判断是否IE8以下浏览器
    */
    function isLowIE() {
        var appName = navigator.appName,
            version = navigator.appVersion.split(";")[1] && navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
        return appName === "Microsoft Internet Explorer" && (version === "MSIE6.0" || version === "MSIE7.0" || version === "MSIE8.0");
    }
    /*
        IE8以及以下浏览器的动效兼容
     */
    function lowIeSupport() {
        //IE下面的降级兼容
        //右上角三角切换
        $('.xk-nav-wrap').hover(function() {
            $(this).find('.iconfont').removeClass('icon-arrow').addClass('icon-icon');
        }, function() {
            $(this).find('.iconfont').removeClass('icon-icon').addClass('icon-arrow');
        });
    }
    //上面大的轮播滚动
    $('.lg-banner-container').responsiveSlides({
        pager: true,
        namespace: 'centered-btns',
        timeout: 2000
    });

    //大图下面小的轮播实例
    $(".sm-banner-container-wrap").jCarouselLite({
        btnPrev: ".sm-banner-page-next",
        btnNext: ".sm-banner-page-prev",
        auto: 3000,
        scroll: 3,
        visible: 3,
        speed: 1000,
        onMouse: true
    });

    //名校资源swiper   mxzy-swiper
    $(".mxzy-swiper").jCarouselLite({
        btnNext: ".mxzy-next-btn",
        btnPrev: ".mxzy-prev-btn",
        // auto: 3000,
        scroll: 3,
        visible: 3,
        speed: 1000,
        onMouse: true
    });

    //名校资源卡片鼠标悬停，放大效果
    $('.slide-box-wrap').mouseover(function() {
        var height = $(this).find('.mxzy-list-table-wrap table').height();
        var target = $('.slide-temp-container');
        var ofst = navigator.appName === 'Netscape'?54:98;
        target.html($(this).html()).css('left', $(this).offset().left - ofst).show().height('auto');
        target.find('.mxzy-list-table-wrap').css('height', height + 20);
    })
    $('.slide-temp-container').mouseover(function() {
        $(this).show();
    })
    $('.slide-temp-container').mouseout(function() {
        $(this).hide();
    })
    //视频悬停事件
    $('.video-lg-box,.video-sm-box').hover(function() {
        $(this).find('[class^=video-mask]').show();
    }, function() {
        $(this).find('[class^=video-mask]').hide();
    });
    //科目悬停事件
    $('[data-subject],.nav_class').hover(function() {
        console.log($(this).attr('data-subject'));
        //根据科目ID到后台查询对应高中和初中的信息，显示在页面上，同时存放在js变量中。每次取之前先判断js变量中是否有值，有的话直接用。
        //to do sth:查询操作
        $('.nav_class').show();
    }, function() {
        $('.nav_class').hide();
    })
    //左侧快捷导航点击
    $('.gofloor p').click(function() {
        var cardName = $(this).attr('target');
        $(this).siblings().removeClass('current');
        $(this).addClass('current');
        $('html').animate({
            scrollTop: $('.section-' + cardName).offset().top
        }, 700);
    });
    //滚动下来350左侧快捷菜单才显示
    $(window).scroll(function() {
        var stp = $(this).scrollTop();
        stp > 350 ? $('.gofloor').fadeIn(300) : $('.gofloor').fadeOut(300);
    })
});