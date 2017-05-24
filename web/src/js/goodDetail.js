$(function () {
    var goodsCode = ""+ddsc.getUrlParam("goodsCode");
    //点击tab栏切换
    $(".goodTab span").on("click", function () {
        $(this).addClass("warm").siblings().removeClass("warm");
        var ele = "." + $(this).attr("flag");
        $(ele).removeClass("hide").siblings().addClass("hide");
    })

    //商品详情轮播图
    var bannerSwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true, //循环播放
        autoplay: 3000,
        autoplayDisableOnInteraction: false, //滑动之后可继续自动轮播
    });

    //点击收藏
    $(".collect").on("click", function () {
        $(this).addClass("collected");
    })

    //商品数量调整
    $(".minus,.plus").on("click", function () {
        //数量显示
        var counter = $(this).siblings(".number"),
            count = +counter.html();
        if( $(this).hasClass("minus")){
            count<=1 ? count=1 : count--;
        } else {
            count>=99? count=99 : count++;
        }
        counter.html(count);
    })
})