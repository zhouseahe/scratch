var jiapai = require('./jiapaiconf.js');
var logon = require('./logon-parse.js');
var async = require('async');

var url = jiapai.host+jiapai.url.loginUrl ;
var form = logon.generateForm(jiapai.form.loginForm);

var params = { url:url,method:jiapai.url.loginMethod,form:form };
logon.loginParse(params,function(err,data){
    if(err){
        console.log(err);
        return ;
    }
    console.log(data);
});