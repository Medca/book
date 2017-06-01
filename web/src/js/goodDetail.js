var goodsCode = ""+ddsc.getUrlParam("goodsCode");
var activityCode = ""+ddsc.getUrlParam("activityCode");
var userinfo = ddsc.localStorage.get("userinfo");
if(userinfo){
    var userCode = userinfo.userCode;
}
$(function () {

    //点击tab栏切换
    $(".goodTab span").on("click", function () {
        $(this).addClass("warm").siblings().removeClass("warm");
        var ele = "." + $(this).attr("flag");
        $(ele).removeClass("hide").siblings().addClass("hide");
    })


    //点击收藏
    $(".collect").on("click", function () {
        $(this).toggleClass("collected");
    })

    var count = 1;
    //商品数量调整
    $(".minus,.plus").on("click", function () {
    	var price = $('#newprice').text()
        //数量显示
        var counter = $(this).siblings(".number");
            count = +counter.html();
        if( $(this).hasClass("minus")){
            count<=1 ? count=1 : count--;
        } else {
            count>=99? count=99 : count++;
        }
        counter.html(count);
    })

    //立即购买
    $("#buy").on("click", function(){
         window.location.href = "./submitOrder.html";
    })

    //购物车
    $("#shoppingcar").on("click", function(){
        //  window.location.href = "./car.html?num="+count;
        let params = {
            'num': count,
            'price': count * (1 *   $('#newprice').text()),
            'goodsCode': goodsCode,
            'unitName': '本',
            userCode,
        }
        addshoppingcar(params)
    })

    queryBookPic()

    queryBookList()

    addFootprintinfo(userCode, goodsCode)
})

//商品详情轮播图
function queryBookPic(){
    var goodsCode = ""+ddsc.getUrlParam("goodsCode");
    let params = {
        goodsCode,
        //"isMain": 1
    }
    myAjax.request({
        url: basepath + "/bookpicinfo/queryBookPicinfo.do",
        type: "GET"
    }, params)
        .then( (result) => {
            if(result.status === 0){
               var html = '';
               for(let obj of result.data.list){
                   html += `
                        <div class="swiper-slide">
                        <a href="#" >
                            <img src="${obj.picUrl}"/>
                        </a>
                    </div>
                   `
               }
               $("#bookpic").append(html)
            }
    }).then(()  => {
        var bannerSwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true, //循环播放
            autoplay: 3000,
            autoplayDisableOnInteraction: false, //滑动之后可继续自动轮播
        });     
    }).catch((error) => {
            console.error("报错了:"+error);
    });
}


//商品详情
function queryBookList(){
    let params = {
        goodsCode,
    }
    let acparams = {
        activityCode
    }
    //查询活动编号是否存在，存在则向params加活动编号
    if(activityCode){
         myAjax.request({
            url: basepath + "/activityinfo/queryActivityinfo.do",
            type: "GET"
        }, acparams)    
        .then((result)  => {
            if(result.data.list.length === 1){
                params[activityCode] = result.data.list[0].activityCode
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
    queryBookinfos()

    //查询商品信息
    function queryBookinfos(){
        myAjax.request({
            url: basepath + "/bookinfo/queryAcBookinfo.do",
            type: "GET"
        }, params)
            .then( (result) => {
                if(result.status === 0){
                var html = '';
                var obj = result.data[0]

                //去除html标签
                let bookDescribe = $('<p>'+obj.bookDescribe+'</p>').text();
                $('#bookName').html(obj.bookName)
                $('#bookInfo').html(bookDescribe)
                if(params[activityCode]){
                    html += `
                        <p class="price">
                            <span class="actualPrice warm">￥<i id="newprice">${obj.subprice}</i></span>
                            <span>定价:</span>
                            <del>￥${obj.pirce}</del>
                        </p>
                    `
                }else {
                    html += `
                        <p class="price">
                            <span class="actualPrice warm">￥<i id="newprice">${obj.pirce}</i></span>
                        </p>
                    `
                }
                $('#goodInfo').append(html)
                $("#des").html(bookDescribe)
            }
        }).catch((error) => {
                console.error("报错了:"+error);
        });
    }
}

//添加购物车
function addshoppingcar(obj){
    
    $.ajax({
            type: 'post',
            url:basepath + "/shoppingcar/addShoppingcar.do",
            dataType: "json",
            data:{"num":obj.num,"goodsCode":obj.goodsCode,"price":obj.price,"unitName":obj.unitName,"userCode":obj.userCode},
            success:function(result){
               let msg = {
                    message: result.msg
                }
                showToast(msg)
                if(result.status === 0){
                    setInterval(() => {
                        window.location.href = "./car.html";
                    }, 2000)
                }
            }
        });
        return
    // myAjax.request({
    //     url: basepath + "/shoppingcar/addShoppingcar.do",
	// 	dataType:"json",
    // }, {
    //     "num":obj.num,"goodsCode":obj.goodsCode,"price":obj.price,"unitName":obj.unitName,"userCode":obj.userCode
    //     }
    // )    
    // .then((result)  => {
    //     let msg = {
    //         message: result.msg
    //     }
    //     showToast(msg)
    //     if(result.status === 0){
    //         setInterval(() => {
    //             window.location.href = "./car.html";
    //         }, 2000)
    //     }
    // })
    // .catch((error) => {
    //     /*let layparams = {
    //         message: "报错了:"+error,
    //     }
    //     showToast(layparams)*/
    //     console.error("报错了:"+error);
    // });     
}

//足迹添加
function addFootprintinfo(userCode, goodsCode){

    if(!goodsCode || !userCode){
        return
    }
    // $.ajax({
    //         type: 'post',
    //         url:basepath + "/footprintinfo/addFootprintinfo.do",
    //         dataType: "json",
    //         data:{"goodsCode":goodsCode,"userCode":userCode}
            
    //     });
    myAjax.request({
        url: basepath + "/footprintinfo/addFootprintinfo.do",
		dataType:"json",
    }, {
        userCode,
        goodsCode
    })  
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });  
}