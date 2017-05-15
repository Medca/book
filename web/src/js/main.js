
//轮播图
var bannerSwiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loop: true, //循环播放
    autoplay: 3000,
    autoplayDisableOnInteraction: false, //滑动之后可继续自动轮播
});

//通用可滚动区域
var commonSwiper = new Swiper('.content', {
    watchSlidesProgress : true,
    watchSlidesVisibility : true,
    slidesPerView : 4,
})

//点击菜单显示导航
$(".menu").on("click", function () {
    $(this).toggleClass("active");
    $(".tab").toggleClass("hide");
})

