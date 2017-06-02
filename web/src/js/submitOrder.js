var userinfo = ddsc.localStorage.get("userinfo");

if(!userinfo || (userinfo.userCode==null)){
    window.location.href = './login.html'; 
}
if(userinfo){
    var userCode = userinfo.userCode;
}
$(function () {
    //选择地址
    //如果本地没有默认地址，则不显示地址信息
    var userAddress = ddsc.localStorage.get("userAddress");
    if(userAddress) {
        $(".addressList").removeClass("hide");
        $(".addressList").attr('addrCode',userAddress.addrCode)
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
        addrOrder()
        // console.log("提交订单");
    })

    queryOrderinfos()
})


var goodsinfo = ddsc.localStorage.get("goodsinfo");
//查询
function queryOrderinfos(){
    // console.log(goodsinfo)
    if(!goodsinfo){
        window.location.href = './car.html'
        return
    }
    let html = ``
    html = `
            <li class="seller">
                <i class="select sellerSelect"></i>
                <i class="shop"></i>
                <h3 class="businessName" businessCode="${goodsinfo.businessCode}">${goodsinfo.businessName}</h3>
            </li>
            <li class="good">
                <img src="${goodsinfo.goodPic}" alt="">
                <div class="info" goodsCode=${goodsinfo.goodsCode}>
                    <p class="name" class="goodsName">${goodsinfo.goodsName}</p>
                    <p class="price"><span class="warm">￥<i class="goodsPrice">${goodsinfo.goodsPrice}</i></span><i class="number f_right">x <i class="num">${goodsinfo.number}</i></i><i class="unitName">${goodsinfo.unitName}</i></p>
                </div>
            </li>
        `
    $('#goods').append(html)
    $('.smallTotal').html(goodsinfo.totalAll)
}


function addrOrder(){
    var addrCode =  $(".addressList").attr('addrCode')
    var businessCode= $('.businessName').attr('businessCode');
    var goodsCode = $('.info').attr('goodsCode')
    let msg = {}
    if(!userCode){
        msg = {
            message: "用户不存在"
        }
        showToast(msg)
        setInterval(() => {
            window.location.href = './car.html'
        },2000)
        return
    }
    if(!goodsCode){
        msg = {
            message: "商家不存在"
        }
        showToast(msg)
        setInterval(() => {
            window.location.href = './car.html'
        },2000)
        return
    }
    if(!addrCode){
        msg = {
            message: "请选择地址"
        }
        showToast(msg)
        return
    }
     var orderInfo = [
            //orderInfo[i]为一个店铺和商品的订单，
            //orderMain为一个店铺的订单，
            //orderDetailList为每个店铺的每个商品的信息
            {
                orderMain: {
                    remark: $('.remark').text(),
                    statusCode: '4',
                    businessCode,
                    addrCode,
                    userCode,
                },
                orderDetailList: [{
                    goodsCode,
                    num: $('.num').text(),
                    unitName: $('.unitName').text()
                }]
            }
        ]
    
    orderInfo = JSON.stringify(orderInfo)
    myAjax.request({
        url: basepath + "/orderinfo/addOrderMainInfo.do",
		dataType:"json",
        contentType: 'application/json',
    }, orderInfo)    
    .then((result)  => {
       msg = {
            message: result.msg
        }
        showToast(msg)
        if(result.status == 0){
            window.location.href = './orderCenter.html'
        }
    })
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    })
}
