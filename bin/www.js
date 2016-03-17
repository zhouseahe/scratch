var loginService = require('../lib/login.js');
var dakaService = require('../lib/daka.js');
var cheerio = require('cheerio');

var param = {url:'http://erp1.jd.com/newHrm/Verify.aspx?returnUrl=http://erp.jd.com/index.tpsml',
	method:'get'};

loginService.loginForm(param,function(err,form){
	var loginArgs = {};
	loginArgs.form = form ;
	loginArgs.form.name='zhoushaohe';
	loginArgs.form.password='Monster&911';
	loginArgs.method= 'post';
	loginArgs.url='http://erp1.jd.com/newHrm/Verify.aspx?returnUrl=http://erp.jd.com/index.tpsml';
	dakaService.daka(loginArgs,function(err,body){
		//console.log(body);
	});
});