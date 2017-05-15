$(function () {

    $(".addressList").on("click", "li", function () {
        var userName = $(this).find(".userName").html(),
            phone = $(this).find(".phone").html(),
            address = $(this).find(".address").html();
        ddsc.localStorage.set("userAddress", {userName: userName, phone: phone, address: address});
        window.history.go(-1);location.reload();
    })
})
