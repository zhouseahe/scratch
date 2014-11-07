var pageService = require('./service/parse-page');
var geek = require('./geekconfig');

var param = {};
param.header=geek.header;
param.pageNumber = geek.pages;
param.base = geek.page_url;

pageService.getPages(param,function(err,result){

});
