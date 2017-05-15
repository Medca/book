$(function () {
    var sort = ddsc.getUrlParam("class")=="goods" ? "我的收藏" : "关注店铺";
    $(".header h3").html(sort);
    $(".product").on("click", "a", function () {
        window.location.href = "./goodDetail.html";
    })
})
