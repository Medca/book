
$(function () {
    //点击搜索框
    var width;
    $("#write").on("focus", function () {
        width = $(this).width();
        $(this).css({width: "73%"});
        $(".back,.submit").removeClass("hide");
    });
    $(".back").on("click", function () {
        $("#write").width(width);
        $(".back,.submit").addClass("hide");
        $(".search").val("");
    })
    $(".submit").on("click", function () {
        console.log("搜索");
    })

    //轮播图
    var bannerSwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true, //循环播放
        autoplay: 3000,
        autoplayDisableOnInteraction: false, //滑动之后可继续自动轮播
    });

    

    //倒计时
    $("#countDown").countDown(1000);

    //点击导航进入对应的商品分类
    $("nav ul").on("click", "a", function () {
        window.location.href = "./html/classify.html?classId=" + $(this).attr("classId");
    })

    //点击商品进入商品详情
    $(".content a").on("click", function () {
        window.location.href = "./html/goodDetail.html";
    })

    queryBanner()

    queryClassify()

    querynewsList()

    querycountDownList()
})

//轮播图
function queryBanner(){
   /* $.ajax({
        url:"http://120.76.114.85:8888/wkz_book/bannerinfo/queryBannerinfo.do",
        type:"GET",
        // contentType:"application/json", //设置请求头信息
        dataType:"json",
        //cache: true,
        //async: false,
        // contentType:"application/json", //设置请求头信息
        data:{},
        success: function(result){
            console.log(result);
        },
        error: function(result){
            alert(result.msg)
        }
    })*/
    let params = ""
    myAjax.request({
        url: basepath + "/bannerinfo/queryBannerinfo.do",
        type: "GET"
    }, params)
        .then( (result) => {
            if(result.status === 0){
                var html = '';
                for(let i of result.data.list){
                    html += `
                        <div class="swiper-slide">
                            <a>
                                <img src="${i.bannerPic}" alt="${i.bannerName}"/>
                            </a>
                        </div>
                    `
                }
                $('#swiper-wrapper').append(html)
            }
    }).catch((error) => {
            console.error("报错了:"+error);
    });
 }

//分类
function queryClassify(){
    let params = ""
    myAjax.request({
        url: basepath + "/classification/queryClassification.do",
        type: "GET"
    }, params)
        .then( (result) => {
            if(result.status === 0){
                var html = '';
                for(let i=0;i<result.data.list.length;i++){
                    html += `
                        <li>
                            <a classId="${i}">
                                <img src="${result.data.list[i].picUrl}" alt="${result.data.list[i].classificationName}">
                            </a>
                        </li>
                    `
                }
                $('#classify').append(html)
            }
    }).catch((error) => {
            console.error("报错了:"+error);
    });
}
 
 //新闻
 function querynewsList(){
    let params = ""
    myAjax.request({
        url: basepath + "/newsinfo/queryNewsinfo.do",
        type: "GET"
    }, params)
        .then( (result) => {
            if(result.status === 0){
                var html = '';
                result.data.list.forEach((val, index) => {
                    html += `
                        <li>
                                <b>${val.subTitle}</b><span>${val.title}</span>
                        </li>
                    `
                })
                $('#newsList').append(html)
            }
    }).then(() => {
        //快讯滚动播出
        var liHeight = $("#newsList li:first-child").height(),
            liNum = $("#newsList li").length;
        var i = 0;
        setInterval(function () { 
            if(i == liNum){
                i = 0;
            }
            $("#newsList").css({top: -i*liHeight});
            i++;
        },3000);
    }).catch((error) => {
            console.error("报错了:"+error);
    });
}

//秒杀
function querycountDownList(){
    let params = {
        "businessCode" : 'admin'
    }
    myAjax.request({
        url: basepath + "/activityrelation/queryActivityrelation.do",
        type: "GET"
    }, params)
    .then( (result) => {
        if(result.status === 0){
            var html = '';
            var res = result.data.list[0];
            console.log(res)
            html = `
                <li class="swiper-slide">
                    <a>
                        <img src="${res.picUrl}" alt="">
                        <p class="bookname">${res.bookName}</p>
                        <p class="warm">${res.subprice}</p>
                        <del>${res.pirce}</del>
                    </a>
                </li>
            `
            $('#countDownList').append(html)
        }
    }).catch((error) => {
            console.error("报错了:"+error);
    });
}


//推荐
 function queryActivityrelation(){
    let params = {
        "businessCode" : 'admin'
    }
    myAjax.request({
        url: basepath + "/activityrelation/queryActivityrelation.do",
        type: "GET"
    }, params)
        .then( (result) => {
            if(result.status === 0){
                var html = '';
               $.each((index,val) => {
                   html += `

                   `
               })
                $('#newsList').append(html)
            }
    }).catch((error) => {
            console.error("报错了:"+error);
    });
}