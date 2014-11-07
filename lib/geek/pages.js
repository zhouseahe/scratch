var geek = require('./geekconfig');
var async = require('async');
var pageService = require('./service/parse-page');
var exportService = require('./service/exportService');

var pageUrl = geek.page_url;
var pageNumber = geek.pages;
var header = geek.header;

function getPages(base){
    for(var i = 1 ; i < 2 ; ++i){
        pageService.parsePage(base + i );
    }
    setTimeout(function(){
        console.log(pageService.getResult());
        exportService.export(header , pageService.getResult());
    },10000);
}

getPages(pageUrl);
