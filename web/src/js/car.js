var userinfo = ddsc.localStorage.get("userinfo");
if(userinfo){
    var userCode = userinfo.userCode;
}
ddsc.localStorage.del("goodsinfo");
$(function () {
    queryshoppingcar()
    
})


//查询购物车
function queryshoppingcar(){
    let params = {
        userCode
    }
    myAjax.request({
        url: basepath + "/shoppingcar/queryShoppingcar.do",
		type: 'GET'
    }, params)    
    .then((result)  => {
        let html = ''
        let h = ''
        if(result.status === 0){
            result.data.forEach((val, index) => {
                html = `
                    <div class="seller businessCode" businessCode="${val.businessCode}" data-businessCode='${val.businessCode}'>
                        <i class="select sellerSelect"></i>
                        <i class="shop"></i>
                        <h3 class="businessName">${val.businessName}</h3>
                    </div>
                    <ul class="goods" id="${index}ul">
                        
                    </ul>
                    <div class="sellerTotal">
                        <span class="f_right warm"><b>￥</b><i class="smallTotal">0.00</i></span>
                        <span class="f_right">店铺合计：</span>
                    </div>
                `
                $('#product').append(html)
                $('.shop').css('background-url', val.businessPic);

                //列出商品
                for(let i of val.getGoodsInfos){
                     h += `
                        <li class="goodsCode" data-goodsCode=${i.goodsCode}>
                            <i class="select goodsSelect"></i>
                            <a>
                                <img class="goodPic" src="${i.picUrl}" alt="">
                                <div class="info">
                                    <p class="name goodsName">${i.bookName}</p>
                                    <p class="price"><span>￥<i class="goodsPrice">${i.goodsPrice}</i></span><del>￥39.90</del></p>
                                    <p>
                                        <b class="">x</b>
                                        <i class="minus hide">-</i><i class="number">${i.num}</i><i class="unitName">${i.unitName}</i><i class="plus hide">+</i>
                                        <i class="delete hide"></i>
                                    </p>

                                </div>
                            </a>
                        </li>
                    ` 
                    $('#'+index+'ul').append(h)   
                    h = ''
                }
            })
        }
    }).then(() => {
        //删除商品
        $('.delete').on('click', function(event){
            event.stopPropagation();
            let goodsCode = $(this).parent().parent().parent().parent().data('goodscode');
            deleteShoppingCar(goodsCode, userCode)
        })

        //单选按钮
        $(".goodsSelect").on("click", function () {
            //当前按钮样式
            $(this).toggleClass("selected");

            var product = $(this).parent().parent().parent(),
                seller = product.find(".sellerSelect"),//当前店铺
                goods = product.find(".goodsSelect"),//当前店铺内所有商品
                isSellerSelectAll;

            //当前店铺内所有商品是否全部选中
            isSellerSelectAll = isSelectAll(goods);
            //当前店铺联动
            toggleStatus(isSellerSelectAll, seller);
            //购物车全选联动
            sellerSelectAll();

            //价格计算
            var good = $(this).parent().parent().find("li"),
                sellerTotal = product.find(".smallTotal");
            smallTotal(good, sellerTotal);
            totalCount();
            return false;
        })

        //店铺全选按钮
        $(".sellerSelect").on("click", function () {
            //当前按钮样式
            $(this).toggleClass("selected");

            var goods = $(this).parent().parent().find(".goods .select"),//当前店铺内所有商品
                isSellerSelectAll = $(this).hasClass("selected");//当前按钮选择状态

            //当前店铺内商品联动
            toggleStatus(isSellerSelectAll, goods);
            //购物车全选联动
            sellerSelectAll();

            //计算价格
            var good = $(this).parent().parent().find(".goods li"),
                sellerTotal = $(this).parent().parent().find(".smallTotal");
            smallTotal(good, sellerTotal);
            totalCount();
        })

        //购物车全选按钮
        $("#selectAll").on("click", function () {
            //当前按钮样式
            $(this).toggleClass("selected");

            var isSelectAll = $(this).hasClass("selected");//当前按钮选择状态
            //购物车内所有商品联动
            toggleStatus(isSelectAll, $(".select"));

            //计算价格
            var goods = $(".product"),
                good, sellerTotal;
            $.each(goods, function (i, e) {
                good = $(e).find(".goods li");
                sellerTotal = $(e).find(".smallTotal");
                smallTotal(good, sellerTotal);
                totalCount();
            })
        })

        //编辑按钮
        $("#edit").on("click", function () {
            //判断当前按钮状态//0--未编辑，1--待完成
            var status = $(this).html()=="编辑"?0:1;
            if(!status){
                $(".minus,.plus,.delete").removeClass("hide");
                $(".info i:nth-child(3)").addClass("count");
                $(".info b,.price").addClass("hide");
                $(this).html("完成");
            } else {
                $(".minus,.plus,.delete").addClass("hide");
                $(".info i:nth-child(3)").removeClass("count");
                $(".info b,.price").removeClass("hide");
                $(this).html("编辑");

            }

        })

        //商品数量调整
        $(".minus,.plus").on("click", function () {
            //数量显示
            var counter = $(this).siblings(".count"),
                count = +counter.html();
            if( $(this).hasClass("minus")){
                count<=1 ? count=1 : count--;
            } else {
                count>=99? count=99 : count++;
            }
            counter.html(count);

            //价格计算
            var product = $(this).parent().parent().parent().parent().parent().parent(),
                good = product.find(".goods li"),
                sellerTotal = product.find(".smallTotal");
            smallTotal(good, sellerTotal);
            totalCount();

            //修改接口
            let params = {
                userCode,
                goodsCode: $(this).parent().parent().parent().parent('li').data('goodscode'),
                num: count,
            }
            modifyShoppingCar(params)

            return false;//防止冒泡
        })

        //点击进入商品详情
        $(".product li").on("click", function () {
            let goodsCode = $(this).data('goodscode')
            window.location.href = "goodDetail.html?goodsCode="+goodsCode;
        })

        //结算购物车
        $(".settle").on("click", function () {
            //获取选中的商品的所有值
            var businessName = $('.businessName').text();
            var goodPic = $('.goodPic').attr('src');
            var goodsName = $('.goodsName').text();
            var goodsPrice = $('.goodsPrice').text();
            var number = $(".number").text();
            var unitName = $(".unitName").text();
            var goodsCode = $(".goodsCode").data('goodscode');
            var businessCode = $(".businessCode").attr("businessCode");
            var smallTotal = $('.smallTotal').text()
            var totalAll = $('.totalAll').text()
            var goodsinfo = {
                businessName,
                goodPic,
                goodsName,
                goodsPrice,
                number,
                unitName,
                goodsCode,
                businessCode,
                smallTotal,
                totalAll,
            }
            
            if(totalAll == '0.00'){
                alert('请选择商品')
                return
            }
            ddsc.localStorage.set("goodsinfo",goodsinfo);
            window.location.href = "./submitOrder.html";
        })


        //购物车全选按钮联动函数封装
        function sellerSelectAll() {
            var sellers = $(".sellerSelect"),//所有店铺
                isGoodsSelectAll;
            //购物车内所有店铺是否全部选中
            isGoodsSelectAll = isSelectAll(sellers);
            //购物车全选按钮联动
            toggleStatus(isGoodsSelectAll, $("#selectAll"));
        }

        /**
         * 判断所有元素是否全部选中
         * @param goods
         * @returns {boolean}
         */
        function isSelectAll(elements) {
            for(var i = 0; i < elements.length; i++){
                if(!$(elements[i]).hasClass("selected")){
                    return false;
                }
            }
            return true;
        }

        /**
         * 根据条件变换选中状态
         * @param isSelectAll
         * @param element
         */
        function toggleStatus(isSelectAll, element) {
            isSelectAll?element.addClass("selected"):element.removeClass("selected");
        }

        //店铺价格计算
        function smallTotal(good, smallTotal) {
            var price, count, isSelected, total = 0;
            $.each(good, function (i, e) {
                count = $(e).find(".number").html();
                price = $(e).find(".price span").text().slice(1);
                isSelected = $(e).find(".select").hasClass("selected");
                if(isSelected){
                    total = +total + count * price ;
                }
            })
            smallTotal.html(ddsc.formatMoney(total));
        }
        //购物车合计
        function totalCount(){
            var sellerTotal = 0;
            $.each($(".smallTotal"), function (i, e) {
                sellerTotal = +$(e).html() + sellerTotal;
            })
            $(".totalAll").html(ddsc.formatMoney(sellerTotal));
        }
    }).catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });     
}

//修改数量
function modifyShoppingCar(obj){
    myAjax.request({
        url: basepath + "/shoppingcar/updateShoppingcar.do",
		dataType:"json",
    }, obj)    
    .then((result)  => {
        /*let msg = {
            message: result.msg
        }
        showToast(msg)*/
    })
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });     
}


//删除商品
function deleteShoppingCar(goodsCode, userCode){
    let params = {
        goodsCode,
        userCode,
    }
    myAjax.request({
        url: basepath + "/shoppingcar/deleteShoppingcar.do",
		dataType:"json",
    }, params)    
    .then((result)  => {
        let msg = {
            message: result.msg
        }
        showToast(msg)
    })
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });     
}