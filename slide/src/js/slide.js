(function ($) {
    $.fn.extend({
        "slide": function (options) {
            var defaults = {
                    "slideMode": "fade", //切换方式（slide>>无缝滑动；fade>>普通轮播）；
                    "autoPlay": true,    //是否自动轮播
                    "bannerWidth": 1000  //设置图片可视宽度（针对于无缝轮播）
                },
                settings = $.extend(defaults, options),
                slideNext = ".sNext",
                slidePrev = ".sPrev";
            //无缝轮播
            if (settings.slideMode === "slide") {
                var bannerBox = $(this).children().first(),
                    index = 0,
                    size;

                bannerBox.find("li").first().clone().appendTo(bannerBox);
                size = bannerBox.find("li").length;
                bannerBox.width(settings.bannerWidth * size);

                //自动轮播
                if (settings.autoPlay)
                    var interVal = setInterval(function () {
                        index++;
                        banner();
                    }, 3000)

                $(this).find(slideNext).live("click", function () {
                    index++;
                    banner();
                })

                $(this).find(slidePrev).live("click", function () {
                    index--;
                    banner();
                })
                //点击左右停止自动轮播
                $(this).find(slideNext).parent().click(function () {
                    clearInterval(interVal);
                    if (settings.autoPlay)
                        interVal = setInterval(function () {
                            index++;
                            banner();
                        }, 3000);
                })

                function banner() {
                    //index等于长度后的结果： 最终显示第一张banner
                    //过程：首先left设置为0,然后index赋值为1，最后下面动画执行left：-1*settings.bannerWidth+“px”
                    /**
                     * 实现无缝最重要的原理是：在执行到最后的时候，设置left为0，让图片回到刚加载的位置
                     *
                     * （需要在尾部添加一个复制的第一个banner——作为过度）（在这一过程中肉眼无法看见）
                     * 在回到最初始位置时，在设置一个left:settings.bannerWidth的动画，滑动到第二张，就会实现无缝。
                     *
                     * 效果看起像是一直往右边滑动，其实是在滑动到最后的时候初始化了他的位置
                     * */
                    //到最右边时
                    if (index >= size) {
                        bannerBox.css({left: "0px"});
                        index = 1
                    }
                    //到最左边时
                    if (index < 0) {
                        bannerBox.css({left: -(size - 1) * settings.bannerWidth + "px"});
                        index = size - 2;
                    }
                    bannerBox.stop().animate({left: -index * settings.bannerWidth + "px"})
                    if (index === 3) {
                        $("ol li").eq(0).addClass("cur").siblings().removeClass("cur");
                    }
                    $("ol li").eq(index).addClass("cur").siblings().removeClass("cur");
                }

                //图标联动
                $("ol li").live("click", function () {
                    clearInterval(interVal);
                    index = $(this).index();
                    $(this).addClass("cur").siblings().removeClass("cur");
                    bannerBox.animate({left: -index * settings.bannerWidth + "px"})
                    if (settings.autoPlay)
                        interVal = setInterval(function () {
                            index++;
                            banner();
                        }, 3000);
                });
            }
            //普通轮播
            else {
                var bannerBox = $(this).children().first().find("li"),
                    slideOl = $(this).find("ol li"),
                    bannerLen = bannerBox.length,
                    index = 0;
                console.log(bannerLen)
                if (settings.autoPlay)
                    var slideInval = setInterval(slide, 4000);
                $(this).find(slideNext).live('click', function () {
                    clearInterval(slideInval);
                    slide();
                    if (settings.autoPlay)
                        slideInval = setInterval(slide, 4000);
                })

                $(this).find(slidePrev).live('click', function () {
                    clearInterval(slideInval);
                    if (index === 0) {
                        bannerBox.eq(0).fadeOut();
                        bannerBox.eq(bannerLen - 1).fadeIn();
                        index = bannerLen - 1;
                    } else {
                        bannerBox.eq(index).fadeOut();
                        bannerBox.eq(index - 1).fadeIn();
                        index--;
                    }
                    slideOl.eq(index).addClass("cur").siblings().removeClass("cur");
                    if (settings.autoPlay)
                        slideInval = setInterval(slide, 4000);
                })

                function slide() {
                    if (index < bannerLen - 1) {
                        bannerBox.eq(index).fadeOut();
                        bannerBox.eq(index + 1).fadeIn();
                        index++;
                    } else {
                        bannerBox.eq(index).fadeOut();
                        bannerBox.eq(0).fadeIn();
                        index = 0;
                    }
                    slideOl.eq(index).addClass("cur").siblings().removeClass("cur");
                }

                slideOl.live("click", function () {
                    clearInterval(slideInval);
                    index = $(this).index();
                    $(this).addClass("cur").siblings().removeClass("cur");
                    bannerBox.eq(index).fadeIn().siblings().fadeOut();
                    if (settings.autoPlay)
                        slideInval = setInterval(slide, 4000);
                })
            }
        }
    })
})($)