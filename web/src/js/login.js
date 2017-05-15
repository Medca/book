$(function () {
    $("#userName").on("keyup", function () {
        if($(this).val().length <= 0){
            $(this).attr("placeholder", "请输入手机号");
            $(this).siblings("i").addClass("hide");
        } else {
            $(this).siblings("i").removeClass("hide").on("click", function () {
                $("#userName").val("").attr("placeholder", "请输入手机号");
                $(this).addClass("hide");
                ableToSubmit();
            })
        }
    })
    $("#userName,#passWord").on("focus", function () {
        $(this).attr("placeholder", "");
    })
    $("#userName").on("blur", function () {
        if($(this).val().length <= 0){
            $(this).attr("placeholder", "请输入手机号");
        }
    })
    $("#passWord").on("blur", function () {
        if($(this).val().length <= 0){
            $(this).attr("placeholder", "6-18,必须包含数字、字母和字符");
        }
    })

    $("#userName,#passWord").on("keyup", function () {
        ableToSubmit();
    })

    $("#regist").on("click", function () {
        var tel = $("#userName").val(),
            passWord = $("#passWord").val(),
            rPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            // rPassword = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
            // rPassword = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
            rPassword = /^(?=.{6,16}$)(?![0-9]+$)(?!.*(.).*\1)[0-9a-zA-Z]+$/
        var UNameResult = rPhone.test(tel),
            UPsdResult = rPassword.test(passWord),
            massage = "",
            params = {};
        if(!UNameResult){
            params.massage = "请输入合法的手机号";
            showToast(params)
            return
        } 
        if(!UPsdResult){
            params.massage = "请输入合法的密码";
            showToast(params)
            return
        }
		let user = {
			tel,
			pwd : passWord,
			//userName , 
			//sex, 
			//age , 
			//userPic
		}
        registUser(user, "注册成功")
        

    })


    function ableToSubmit() {
        if($("#userName").val() && $("#passWord").val()){
            $(".submit").addClass("active");
        } else{
            $(".submit").removeClass("active");
        }
    }

    $("#login").on("click", () => {
        var userName = $("#userName").val(),
            passWord = $("#passWord").val(),
            rPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            // rPassword = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
            // rPassword = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
            rPassword = /^(?=.{6,16}$)(?![0-9]+$)(?!.*(.).*\1)[0-9a-zA-Z]+$/
        var UNameResult = rPhone.test(userName),
            UPsdResult = rPassword.test(passWord),
            massage = "",
            params = {};
        if(!UNameResult){
            params.massage = "请输入合法的手机号";
            showToast(params)
            return
        }
        if(!UPsdResult){
            params.massage = "请输入合法的密码";
            showToast(params)
            return
        } 
        login(userName, passWord)
    })
})

function registUser(user, massage){
    let params = user
    myAjax.request({
        url: basepath + "/userinfo/addUserinfo.do",
        type: "POST"
    }, params)
        .then( (result) => {
            //alert(JSON.stringify(result))
            var lParams = {
                message: massage,
				time: 3000,
                callback: function(){
                    if(result.status == 0){//console.log(1);
                        setTimeout(function () {
                            window.location.href = "login.html";
                        }, 3000);
                    }
                }
            }
            showToast(lParams)
    }).catch((error) => {
            console.error("报错了:"+error);
    });
 }

 
function login(tel, pwd){
    let params = {tel: tel,pwd: pwd}
    myAjax.request({
        url: basepath + "/userinfo/checkLogin.do",
        type: "POST"
    }, params)
        .then((result) => {
           //alert(JSON.stringify(result))
            var lParams = {
                message: result.msg,
                callback: function(){
                    if(result.status == 0){//console.log(1);
                        ddsc.localStorage.set('userinfo', result.data)
                    }
                }
            }
            showToast(lParams)
    }).catch((error) => {
            console.error("报错了:"+error);
    });
 }