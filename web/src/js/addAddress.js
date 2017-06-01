$(function () {
            
    var userCode = ""+ddsc.getUrlParam("userCode");

    //地区选择
    var area1 = new LArea();
    

    area1.init({
        'trigger': '#city', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#value1', //选择完毕后id属性输出到该位置
        'keys': {
            id: 'id',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': LAreaData //数据源
    });
    area1.value=[0,0,0];//控制初始位置，注意：该方法并不会影响到input的value

    //默认地址选择
    $(".select").on("click", function () {
        $(this).toggleClass("selected");
    })

    //添加地址
    var userName, phone, city, address;
    $(".add").on("click", function () {
        userName = $(".receiver").val(),
        phone = $(".phone").val(),
        city = $("#city").val(),
        address = $("#address").val();
        //非空判断
        if(ddsc.inputVal.notNull(userName, "收货人不能为空")){
            if(ddsc.inputVal.notNull(phone, "手机号不能为空")){
                if(ddsc.inputVal.notNull(city, "地区选择不能为空")){
                    if(ddsc.inputVal.notNull(address, "收货地址不能为空")){
                        let isMain = $('.select').hasClass('selected') ? '1' : '0'
                        let obj = {
                            consigneeName: userName,
                            consigneeTel: phone,
                            address: city+address,
                            userCode: userCode || userAddress.userCode,
                            addrCode: userAddress.addrCode,
                            isMain,
                        }
                        //判断userAddress是否存在,执行添加或者编辑
                        userAddress ? modifyAddressinfo(obj) : addAddressinfo(obj)
                    }
                }
            }
        }
        
    })


    //获取userAddress并赋值
    var userAddress = ddsc.localStorage.get('userAddress');
    if(userAddress){
        $('.receiver').val(userAddress.userName)
        $('.phone').val(userAddress.phone)
        $('#address').val(userAddress.address)
        if(userAddress.selected === 1){
            $('.select').addClass("selected");
        }
    }
})



//添加接口
function addAddressinfo(obj){
    myAjax.request({
        url: basepath + "/addinfo/addAddinfo.do",
		dataType:"json",
    }, obj)  
    .then((result) => {
        let layParams = {
            message: result.msg
        }
        showToast(layParams)
        if(result.status == 0){
             setInterval(() => {
                 ddsc.localStorage.del('userAddress');
                window.location.href = "./address.html";
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

//修改接口
function modifyAddressinfo(obj){
    let layParams = {}
    if(!obj.userCode){
        layParams = {
            message: "用户不存在"
        }
        showToast(layParams)
        return;
    }
     myAjax.request({
        url: basepath + "/addinfo/updateAddinfoStatus.do",
		dataType:"json",
    }, obj)  
    .then((result) => {
        layParams = {
            message: result.msg
        }
        showToast(layParams)
    })
    .catch((error) => {
        /*let layparams = {
            message: "报错了:"+error,
        }
        showToast(layparams)*/
        console.error("报错了:"+error);
    });
}