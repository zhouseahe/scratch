var pageService = require('../../lib/geek/service/parse-page');
var exportService = require('../../lib/geek/service/exportService');
var geek = require('../../lib/geek/geekconfig');

var param = {};
param.header=geek.header;
param.pageNumber = geek.pages;
param.base = geek.page_url;

pageService.getPages(param,function(err,result){
    if(err){
        console.log(err);
        return ;
    }
    exportService.export(param.header,result,function(err){
        if(err){
            console.log(err);
        }else{
            console.log('导出完成！');
        }
    });
});
