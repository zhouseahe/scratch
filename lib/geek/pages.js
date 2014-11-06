var geek = require('./geekconfig');
var async = require('async');
var pageService = require('./service/parse-page');
var exportService = require('./service/exportService');

var pageUrl = geek.page_url;
var pageNumber = geek.pages;

function getPages(base){
    for(var i = 1 ; i < pageNumber + 1 ; ++i){
        pageService.parsePage(base + i );
    }
    setTimeout(function(){
        console.log(pageService.getResult())
        exportService.export(pageService.getResult());
    },10000);
}

getPages(pageUrl);
