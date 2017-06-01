var userinfo = ddsc.localStorage.get("userinfo");
if(userinfo){
    var userCode = userinfo.userCode;
}
$(function () {
   

    queryOrderinfos()
})

//查询
function queryOrderinfos(){
    let obj = {
        userCode
    }
     myAjax.request({
        url: basepath + "/orderinfo/queryOrderinfosMobile.do",
		type: 'GET'
    }, obj)  
    .then((result) => {
        if(result.status == 0){
             let html = ''
             let h = ''
             result.data.map((item, index) => {
                 html = `
                    <div class="product" orderCode="${item.orderCode}">
                        <div class="title clearfix">
                            <div class="date f_left">
                                <span>订单时间：</span>
                                <span class="time">${new Date(item.createTime).pattern('yyyy-MM-dd HH:mm:ss')}</span>
                            </div>
                            <div class="status f_right warm">${item.statusName}</div>
                        </div>
                        <ul class="goods${index}">
                        
                        </ul>
                        <div class="sellerTotal">
                            <span class="f_right"><b>￥</b><i class="smallTotal">${item.totalPrice}</i></span>
                            <span class="f_right">共计：</span>
                        </div>
                    </div>
                 `
                 $("#productlist").append(html)
                 for(let i of item.getGoodsInfos){
                     h = `
                         <li goodsCode="${i.goodsCode}">
                            <img src="${i.picUrl}" alt="">
                            <div class="info">
                                <p class="name">${i.bookName}</p>
                                <p class="price"><span class="warm">￥${i.goodsPirce}</span><i class="number f_right">x ${i.num}</i></p>
                            </div>
                        </li>
                     `
                     $('.goods'+index).append(h)
                 }
             })
        }
    }).then(() => {
       $(".product").on("click", function () {
            let orderCode = $(this).attr('orderCode');
            window.location.href = "orderDetail.html?orderCode="+orderCode;
        })
    })
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });
}
