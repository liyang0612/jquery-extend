(function ($) {
    $.fn.extend({
        "scrollAct": function (options) {
            var defaults = {
                    nav: "nav'",
                    pageList: "page"
                },
                setting = $.extend(defaults, options), //第二个参数覆盖默认defaluts
                navList = $("." + setting.nav).children(),
                pageList = $("." + setting.pageList).children(),
                pageLen = pageList.length;
            //nav点击事件
            navList.click(function () {
                var scrollHeight = pageList.eq($(this).index()).offset().top;//当前index高度位置
                $('body').animate({scrollTop: scrollHeight}, 500);
            })
            //滚动条事件
            $(window.document).scroll(function () {
                var scrollHeight = $(this).scrollTop() + 60;//滚动条位置
                //遍历pageList,找到滚动条所在区域的page，为想要的nav添加高亮
                for (var i = pageLen; i > 0; i--) {
                    var offTop = pageList.eq(i - 1).offset().top;
                    if (scrollHeight >= offTop) {
                        set(i);
                        return this;
                    }
                }
            });
            function set(n) {
                /**
                 * 为解决pageList的最后一个高度太小所造成的无法高亮最后一个nav的BUG
                 * 添加一个判断
                 * */
                var scrHeight = $(this).scrollTop(),//卷去页面的高度
                    winHeight = $(window).height(), //窗口高度
                    docHeight = $(document).height(); //文档高度
                //滚动条到达底部时，直接为最后一个nav添加高度
                ((scrHeight + winHeight) == docHeight) ?
                    navList.last().addClass('act').siblings().removeClass('act') :
                    navList.eq(n - 1).addClass('act').siblings().removeClass('act');
            }
        }
    })
})(jQuery)



