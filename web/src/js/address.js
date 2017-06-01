var userinfo = ddsc.localStorage.get("userinfo");
if(userinfo){
    var userCode = userinfo.userCode;
}
$(function () {
    // $(".addressList").on("click", "li", function () {
        // var userName = $(this).find(".userName").html(),
        //     phone = $(this).find(".phone").html(),
        //     address = $(this).find(".address").html()
        //     selected = $(this).find('.selected'),
        //     addrCode = $(this).data('addrCode');
        // ddsc.localStorage.set("userAddress", {userName: userName, phone: phone, address: address, selected: selected, addrCode: addrCode});
        //window.history.go(-1);location.reload();
    // })

    //跳转到添加
    $("#addBtn").on('click',function(){
        ddsc.localStorage.del('userAddress');
        location.href = './addAddress.html'
    })

   queryAddressinfo()
})


//查询接口
function queryAddressinfo(){
    let obj = {
        userCode
    }
     myAjax.request({
        url: basepath + "/addinfo/queryAddinfo.do",
		type: 'GET'
    }, obj)  
    .then((result) => {
        if(result.status == 0){
             let html = ''
             result.data.list.map((item, index) => {
                 html = `
                    <li data-addrCode="${item.addrCode}">
                        <p class="userInfo clearfix"><span class="userName f_left">${item.consigneeName}</span>
                        <span class="phone f_right">${item.consigneeTel}</span></p>
                        <p class="address">${item.address}</p>
                        <p class=="option">
                            <span id="select${index}">默认</span>
                            <span class="delete f_right" id="del">删除</span>
                            <span class="edit f_right" id="modify">编辑</span>
                        </p>
                    </li>
                 `
                $("#addressList").append(html)
                 if(item.isMain === 1){
                     $('#select'+index).addClass('selected')
                 }
                //默认勾选
                // $("#select"+index).on('click', function(){
                //     $("#addressList").find('span.selected').removeClass('selected')
                //     $(this).toggleClass('selected')
                //     //修改状态
                //     modifyStatus()
                // })
             })
        }
    }).then(() => {
        
        //编辑
        $('.edit').on('click', function(){
            var data = $(this).parent().parent();
            var userName = $(data).find(".userName").html(),
                phone = $(data).find(".phone").html(),
                address = $(data).find(".address").html()
                selected = $(data).find('span').hasClass('selected') ? 1 : 0,
                addrCode = $(data).data("addrcode");
            ddsc.localStorage.set("userAddress", {userName: userName, phone: phone, address: address, selected: selected, addrCode: addrCode, userCode:userCode});
        
            window.location.href = "./addAddress.html";
        })

        //删除
        $('.delete').on('click', function(){
            let obj = {
                userCode,
                addrCode: $(this).parent().parent().data('addrcode')
            }
            deleteAddressinfo(obj)
        })

        $(".addressList").on("click", "li", function () {
            var userName = $(this).find(".userName").html(),
                phone = $(this).find(".phone").html(),
                address = $(this).find(".address").html(),
                addrCode = $(this).data("addrcode"),
                selected = $(this).find('span').hasClass('selected') ? 1 : 0;
            ddsc.localStorage.set("userAddress", {userName: userName, phone: phone, address: address, selected: selected, addrCode: addrCode, userCode:userCode});
            window.history.go(-1);
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

//删除接口
function deleteAddressinfo(obj){
     myAjax.request({
        url: basepath + "/addinfo/deleteAddinfo.do",
		dataType:"json",
    }, obj)  
    .then((result) => {
        layParams = {
            message: result.msg
        }
        showToast(layParams)
        if(result.status == 0){
             setInterval(() => {
                 location.reload();
             }, 2000)
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