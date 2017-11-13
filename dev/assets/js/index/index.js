$(document).ready(function() {

    xkwIndex.init();
});

var xkwIndex = {
    /**
     * 初始化事件
     * @return {[type]} [description]
     */
    init: function() {
        var initMethods = ['lowIeSupport', 'tab', 'initBannerLg', 'initBannerSm', 'initGoTop', 'initMxzySwiper',
            'initMxzyCard', 'sliceMxzyName', 'videoHover', 'jpzyHeaderSwitch', 'initLeftNav',
            'initVticker', 'searchBoxClick', 'initLeftQuickNav', 'leftBar'
        ];
        var self = this;
        $(initMethods).each(function(index, e) {
            typeof self[e] === 'function' && self[e]();
        })
    },

    /**
     * 显示左侧导航
     */
    initLeftNavBox: function() {
        $('.left-nav-box').show();
    },

    /**
     * 左侧快捷菜单初始化
     * @return {[type]} [description]
     */
    initLeftQuickNav: function() {
        $(window).scroll(function() {
            //滚动下来350左侧快捷菜单才显示
            var stp = $(this).scrollTop();
            stp > 350 ? $('.gofloor').fadeIn(300) : $('.gofloor').fadeOut(300);
        })
    },
    /**
     * 首屏左侧导航悬停事件
     * @return {[type]} [description]
     */
    leftBar: function() {
        var box = $('.subnav');
        var showBox = box.find('li .nav_class');
        box.find('li').hover(function() {
            showBox.hide();
            $(this).find('.nav_class').show();
            //计算高度
            var index = $(this).index();
            var $nav = $(this).find('.nav_class');
            if ($nav.height() > (14 - index) * 40) {
                $nav.css({
                    'top': '-' + ($nav.height() - (14 - index) * 40 + 1) + 'px'
                });
            } else {
                $nav.css({
                    'top': '0px'
                });
            }
        }, function() {
            $('.nav_class').hide();
        });
    },
    tab: function() {
        var menu = $(".tab-menu");
        menu.find("a:first-child").addClass('current');
        $('.tab-list:first-child').show();
        menu.on('mouseenter', 'a', function() {
            var index = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.tab-list').eq(index).show().siblings().hide();
        })
    },
    /**
     * IE8以及以下浏览器的动效兼容
     */
    lowIeSupport: function() {
        function isLowIE() {
            var appName = navigator.appName,
                version = navigator.appVersion.split(";")[1] && navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
            return appName === "Microsoft Internet Explorer" && (version === "MSIE6.0" || version === "MSIE7.0" || version === "MSIE8.0");
        }
        if (isLowIE) {
            //IE下面的降级兼容
            //右上角三角切换和搜索框左侧的全国箭头切换
            $('.xk-nav-wrap,.scop-box,.change-box').hover(function() {
                $(this).find('.iconfont').removeClass('icon-arrow').addClass('icon-icon');
            }, function() {
                $(this).find('.iconfont').removeClass('icon-icon').addClass('icon-arrow');
            });
        }
    },
    /**
     * 上面大的轮播滚动
     */
    initBannerLg: function() {
        $('.lg-banner-container').responsiveSlides({
            pager: true,
            namespace: 'centered-btns',
            timeout: 2000
        });
    },
    /**
     * 大图下面小的轮播实例
     */
    initBannerSm: function() {
        $(".sm-banner-container-wrap").jCarouselLite({
            btnPrev: ".sm-banner-page-prev",
            btnNext: ".sm-banner-page-next",
            // auto: 3000,
            scroll: 3,
            visible: 3,
            speed: 1000,
            onMouse: true
        });
    },
    /**
     * 点击回到顶部
     */
    initGoTop: function() {
        var goTopBtn = $("#gotop").hide();
        $(window).scroll(function() {
            $(window).scrollTop() > 350 ? goTopBtn.show() : goTopBtn.hide();
        });
        goTopBtn.click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 700);
            return false;
        });
    },
    /**
     * 名校资源swiper   mxzy-swiper
     */
    initMxzySwiper: function() {
        xkwIndex.mxzySwiper = $(".mxzy-swiper").jCarouselLite({
            btnNext: ".mxzy-next-btn",
            btnPrev: ".mxzy-prev-btn",
            auto: 3000,
            // scroll: 3,
            visible: 3,
            speed: 1000,
            onMouse: true,
            provinceMap: {
                parentClass: 'mxzy-province',
                childClass: 'current'
            },
            afterEnd: function(ele) {
                //省份ID
                var pId = $(ele[0]).attr('data-province-id');
                $('.mxzy-province.current').removeClass('current');
                $('.' + pId).addClass('current');
            }
        });
    },
    /**
     * 名校资料卡片悬停效果
     */
    initMxzyCard: function() {
        //名校资源卡片鼠标悬停，放大效果
        $('.slide-box-wrap').mouseover(function() {
            //滚动的时候不放大
            if (xkwIndex.mxzySwiper[0].isRunning()) {
                return false;
            }
            //轮播图停止滚动
            xkwIndex.mxzySwiper[0].pause();
            var height = $(this).find('.mxzy-list-table-wrap dl').height();
            var target = $('.slide-temp-container');
            var ofst = navigator.appName === 'Netscape' ? ((window.screen.width - 1200) / 2 + 9) : 93;
            target.html($(this).html()).css('left', $(this).offset().left - ofst).show().height('auto');
            target.find('.mxzy-list-table-wrap').css('height', height + 20);
            $('.right-line-mask').hide();
            $(this).find('.right-line').hide();
        })
        //从名校卡片上移入
        $('.slide-temp-container').mouseover(function() {
            xkwIndex.mxzySwiper[0].pause();
            $('.right-line-mask,.right-line').hide();
            $(this).show();
        })
        //从名校卡片上移开
        $('.slide-temp-container').mouseout(function() {
            xkwIndex.mxzySwiper[0].play();
            $('.right-line-mask,.right-line').show();
            $(this).hide();
        })
    },
    /**
     * 名校资源名校名字，固定显示6个字，后面用省略号代替
     */
    sliceMxzyName: function(limitLength) {
        limitLength = limitLength || 6;
        $('.mxzy-list-table-wrap a').each(function(index, ele) {
            var name = $(this).text();
            name.length >= limitLength && $(this).text(name.substr(0, limitLength) + "...");
        })
    },
    /**
     * 视频悬停事件
     */
    videoHover: function() {
        $('.video-lg-box,.video-sm-box,.video-rt-wrap').hover(function() {
            $(this).find('.shadow').show();
        }, function() {
            $(this).find('.shadow').hide();
        });
    },
    /**
     * 精品资源头部导航切换
     */
    jpzyHeaderSwitch: function() {
        $(".section-jpzy .row-top-nav li").click(function() {
            $(this).addClass('current').siblings().removeClass('current');
            var subject = $(this).attr('jpzy-data-subject');
            $('.jpzy-box').hide();
            $('.jpzy-' + subject).show();
        });
    },
    /**
     * 左侧快捷导航点击
     */
    initLeftNav: function() {
        $('.gofloor p').click(function() {
            var cardName = $(this).attr('target');
            $(this).siblings().removeClass('current');
            $(this).addClass('current');
            $('html').animate({
                scrollTop: $('.section-' + cardName).offset().top
            }, 700);
        });
    },
    /**
     * 单条滚动公告
     */
    initVticker: function() {
        $('.vtikcer-box').vTicker({
            speed: 300, //优化 ：改成300毫秒
            pause: 3000, //优化 ：改成3000毫秒
            animation: 'fade',
            mousePause: true,
            showItems: 1
        });
    },
    /**
     * 搜索框点击事件
     */
    searchBoxClick: function() {
        $('.main-search-ipt').click(function(e) {
            $('.search-tips-wrap').show();
            e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        })
        $(document).click(function(e) {
            $('.search-tips-wrap').hide();
        });
    }
};