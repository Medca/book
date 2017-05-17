var basepath = 'http://localhost/wkz_book'
//var basepath = 'http://120.76.114.85:8888/wkz_book'
//自己封装 的ajax
var myAjax = {
    request: function(options,params){
        return new Promise( (resolve, reject) => {
            //继承参数
            var opts = $.extend({},{
                path:"",
                type:"post",
                model:"",
                method:"",
                params:"",
                //before:function(){loading("请稍后数据执行中...");},
                success:function(){},
                error:function(){reject("服务器异常")},
            },options);
        //url拼接
        if(!opts.url){
            opts.url = opts.path+"/"+opts.model+"/"+opts.method+(opts.params?"?"+opts.params:"");
        }
        $.ajax({
            type:opts.type,
            url:opts.url,
            beforeSend:opts.before,
            error:opts.error,
            data:params,
            success:function(data){
                resolve(data)
            }
        });
        })
    }
};

//layer.open封装
function showToast(params){
     //console.log(params)
     layer.open({
        content: params.message || 'message',
        time: params.time || 1.5,
        success: function () {
            params.callback && params.callback()
        }
    });
}