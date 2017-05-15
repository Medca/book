$(function () {
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
        return false;//防止冒泡
    })

    //点击进入商品详情
    $(".product li").on("click", function () {
        window.location.href = "goodDetail.html";
    })

    //结算购物车
    $(".settle").on("click", function () {
        console.log(1);
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
            price = $(e).find(".price span").html().slice(1);
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

})