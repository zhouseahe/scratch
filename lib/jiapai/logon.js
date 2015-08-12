var request = require('request');
var loginService = {};

loginService.login = function(params,cb){
    request({
        method: params.method,
        url: params.url,
        form: params.form
    }, function(err, resp, body) {
        if (err) {
            cb(err,null);
            return;
        }
        var cookie = {'cookie':resp.headers['set-cookie'][0]};
        cb(null,cookie);
    });
}

loginService.generateForm = function(params){
    var form = "";
    for(var key in params){
        form+= key + "=" + json[key] +"&"
    }
    return form ;
}

module.exports= loginService;