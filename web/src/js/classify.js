$(function () {
    //从导航页跳转至此页加载当前分类
    var classId = +ddsc.getUrlParam("classId");
    if(classId){
       $("main li").eq(classId).addClass("active").siblings().removeClass("active");
    }

    //点击搜索框
    $("#write").on("focus", function () {
        $(this).css({width: "73%"});
        $(".back,.submit").removeClass("hide");
        $(".go,.menu").addClass("hide");
    });
    $(".back").on("click", function () {
        $("#write").css({width: "73%"});
        $(".back,.submit").addClass("hide");
        $(".go,.menu").removeClass("hide");
        $(".search").val("");
    })
    $(".submit").on("click", function () {
        console.log("搜索");
    })

    //点击标题显示分类列表
    $("main .title").on("click", "li", function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
    //标题导航缓冲效果
    var navSwiper = new Swiper('.title', {
        direction: 'vertical',
    })
    //分类列表缓冲效果
    var listSwiper = new Swiper('.content',{
        direction: 'vertical',
    })
    //点击商品显示商品详情
    $(".list").on("click", function () {
        window.location.href = "./goodDetail.html";
    })
})