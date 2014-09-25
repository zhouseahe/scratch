var request = require('request');

var logUri = 'http://www.yitiku.cn/Tiku/User/login';
var form = 'account=ytk_01@163.com&password=01_ytk_leango';


module.exports= function yitkLogin(){
    request({
        method: 'post',
        url: logUri,
        form: form
    }, function(err, resp, body) {
        if (err) {
            console.log(err)
            return;
        }
        console.log(resp.headers['set-cookie']);
    });
}