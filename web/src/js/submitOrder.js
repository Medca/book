$(function () {
    //选择地址
    //如果本地没有默认地址，则不显示地址信息
    var userAddress = ddsc.localStorage.get("userAddress");
    if(userAddress) {
        $(".addressList").removeClass("hide");
        $(".userName").html(userAddress.userName);
        $(".phone").html(userAddress.phone);
        $(".address").html(userAddress.address);
    }

    //计算订单总价
    var number, price, total = 0;
    $.each($(".goods .good"), function (i, e) {
        number = +$(e).find(".number").html().substring(2);
        price = +$(e).find(".warm").html().substring(1);
        total = number * price + total;
    })
    $(".smallTotal").html(ddsc.formatMoney(total));

    //提交订单
    $(".toPay").on("click", function () {
        console.log("提交订单");
    })
})