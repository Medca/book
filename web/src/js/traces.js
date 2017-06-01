var userinfo = ddsc.localStorage.get("userinfo");
if(userinfo){
    var userCode = userinfo.userCode;
}
$(function () {
    $(".product").on("click", "a", function () {
        window.location.href = "./goodDetail.html?goodsCode="+goodsCode;
    })
    $('#del').on('click', function(){
        deleteFootinfo()
    })
    queryFootinfo()
})

function queryFootinfo(){
    let params = {
        userCode,
    }
     myAjax.request({
            url: basepath + "/footprintinfo/queryFootprintinfo.do",
            type: "GET"
        }, params)    
    .then((result)  => {
        let html = '';
        result.data.list.map((item, index) => {
            html += `
                <li>
                    <a>
                        <img src="${item.picUrl}" alt="">
                        <div class="info f_left">
                            <p>${item.bookName}</p>
                            <p class="warm">￥${item.pirce}</p>
                            <p>
                                <b class="stared"></b>
                                <b class="stared"></b>
                                <b class="stared"></b>
                                <b class="star-half"></b>
                                <b class="star"></b>
                                <i class="conment">(263)</i>
                            </p>
                        </div>
                    </a>
                </li>
            `
            
        })
        $("#product").append(html)
    })
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });
}

//清除
function deleteFootinfo(){
    let params = {
        userCode,
    }
     myAjax.request({
            url: basepath + "/footprintinfo/deleteFootprintinfo.do",
            type: "GET"
        }, params)    
    .then((result)  => {
        let layparams = {
            message: result.msg
        }
        showToast(layparams)
    })
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });
}