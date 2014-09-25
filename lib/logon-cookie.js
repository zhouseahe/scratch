var request = require('request');
var fs  = require('fs');
var logUri = 'http://www.yitiku.cn/Tiku/User/login';
var form = 'account=ytk_01@163.com&password=01_ytk_leango';


module.exports= function yitkLogin(){
    request({
        method: 'post',
        url: logUri,
        form: form
    }, function(err, resp, body) {
        if (err) {
            console.log(err);
            return;
        }
        var cookie = {'yuwen':resp.headers['set-cookie'][0]};
        fs.writeFile('../config/cookie.json',JSON.stringify(cookie),function(err){
            if (err) {
                console.log(err);
                return ;
            } else {
                console.log("保存已完成");
            }
        });
    });
}