var orderCode = ""+ddsc.getUrlParam("orderCode");

$(function(){
    obj.queryList()
})

let obj = {
    queryList() {
        queryOrderinfos()
    }
}

//查询
function queryOrderinfos(){
    console.log(orderCode)
    let obj = {
        orderCode
    }
     myAjax.request({
        url: basepath + "/orderinfo/queryOrderinfosMobile.do",
		type: 'GET'
    }, obj)  
    .then((result) => {
        if(result.status == 0){
             let html = ''
             let h = ''
             console.log(result.data)
             result.data.map((item, index) => {
                 html = `
                    <div class="title clearfix">
                        <div>
                            <span>订单状态：</span>
                            <span class="status warm">${item.statusName}</span>
                        </div>
                        <div>
                            <span>交易时间：</span>
                            <span class="date">${new Date(item.createTime).pattern('yyyy-MM-dd')}</span>
                            <span class="time">${new Date(item.createTime).pattern('HH:mm:ss')}</span>

                        </div>
                        <div class="status">
                            <span>订单号码：</span>
                            <span class="orderId">${item.orderCode}</span>
                        </div>
                        <i></i>
                    </div>
                    <div class="addressList">
                        <p class="userInfo">
                            <span>收货人：</span>
                            <span class="userName">${item.consigneeName}</span>
                        </p>
                        <p>
                            <span>手机号：</span>
                            <span class="phone">${item.consigneeTel}</span>
                        </p>
                        <p class="address">
                            <span>地&nbsp;&nbsp;&nbsp;址：</span>
                            <span>${item.address}</span>
                        </p>
                        <i></i>
                    </div>
                    <ul class="goods" id="goods${index}">
                        <li class="seller">
                            <i class="select sellerSelect"></i>
                            <i class="shop"></i>
                            <h3>${item.businessName}</h3>
                        </li
                    </ul>
                    <div class="sellerTotal">
                        <span class="f_right">总计：<b>￥</b><i class="smallTotal">${item.totalPrice}</i></span>
                        <span class="toPay f_right hide">立即支付</span>
                    </div>
                 `
                 $("#productlist").append(html)
                 for(let i of item.getGoodsInfos){
                     h = `
                        <li>
                            <img src="${i.picUrl}" alt="">
                            <div class="info">
                                <p class="name">${i.bookName}</p>
                                <p class="price"><span class="warm">￥${i.goodsPirce}</span><i class="number f_right">x ${i.num}</i></p>
                            </div>
                        </li>
                     `
                     $('#goods'+index).append(h)
                 }
             })
        }
    })
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });
}
