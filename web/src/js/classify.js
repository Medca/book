$(function () {
    

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
        $("#goodsList").empty();
        queryBook($(this).data('code'));
    })
    //标题导航缓冲效果
    var navSwiper = new Swiper('.title', {
        direction: 'vertical',
    })
    //分类列表缓冲效果
    var listSwiper = new Swiper('.content',{
        direction: 'vertical',
    })
    

    queryClassify()
})

//类型列表
function queryClassify(){
    let params = ""
    myAjax.request({
        url: basepath + "/classification/queryClassification.do",
        type: "GET"
    }, params)
        .then( (result) => {
            if(result.status === 0){
                var html = '';
               $.each(result.data.list, (index,val) => {
                   $('#classifylist').empty()
                   html += `
                    <li class="swiper-slide" data-code="${val.classificationCode}" id="cy${index}">${val.classificationName}</li>
                   `
               })
                $('#classifylist').append(html)
            }
    }).then(() => {
        //从导航页跳转至此页加载当前分类
        var classId = +ddsc.getUrlParam("classId");
        if(classId){
            $("main li").eq(classId).addClass("active").siblings().removeClass("active");
            queryBook($("main .title li").eq(classId).data('code'));
            return
        }
        $("#cy0").addClass("active")
        queryBook($("main .title li").eq(0).data('code'));
    }).catch((error) => {
            console.error("报错了:"+error);
    });
}

//商品列表
function queryBook(classificationCode){
    let params = {
        classificationCode,
        //"isMain": 1
    }
    myAjax.request({
        url: basepath + "/bookinfo/queryBookinfo.do",
        type: "GET"
    }, params)
        .then( (result) => {
            if(result.status === 0){
               var html = '';
               result.data.list.map((val,index) => {
                    html += `
                        <div goodsCode="${val.goodsCode}" class="item"><a><img src="${val.picUrl}" alt=""><span>${val.bookName}</span></a></div>
                    `
               })
               $("#goodsList").append(html)
            }
    }).then(()  => {
        //点击商品显示商品详情
        $(".list .item").on("click", function () {
            var goodsCode = $(this).attr("goodsCode")
            window.location.href = "./goodDetail.html?goodsCode="+goodsCode;
        })       
    }).catch((error) => {
            console.error("报错了:"+error);
    });
}