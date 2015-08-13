var fs = require('fs');
var cheerio = require("cheerio");
var async = require('async');
var request = require('request');
var request = request.defaults({jar: true});
var loginService = {};

loginService.loginParse = function(params,cb){
    request({
        method: params.method,
        url: params.url,
        form: params.form
    }, function(err, resp, body) {
        if (err) {
            cb(err,null);
            return;
        }
        var page = [1,2,3,4,5,6,7,8,9,10];
        async.eachSeries(page, function iterator(item, callback) {
            loadPage(item, callback);
        }, function done() {
            cb(null,'prepared finish ...wait loading...');
        });
    });
}

function loadPage(pageIndex,cb){
    request({
        method: 'get',
        url: 'http://www.jiapai.cn/buyer/albums/view?id=1471&page=' + pageIndex + '&per-page=24',
        form: ''
    }, function(err, resp, body) {
        console.log("loading page : " + pageIndex);
        if (err) {
            cb(err,null);
            return;
        }
        downPageImages(body,cb);
    });
}

function downPageImages(body,cb){
    var item ;
    $ = cheerio.load(body);
    var list = $('.J-down');
    for(var i = 0 ;i<list.length; i++){
        item = list[i].attribs['href'];
        request(item).on('error', function(err) {
            console.log(item);
        }).pipe(fs.createWriteStream('./image/' + cutFilename(item)));
    }
    cb();
}

function cutFilename(url){
    var start = url.lastIndexOf('/');
    return url.substring(start+1);
}

loginService.generateForm = function(params){
    var form = "";
    for(var key in params){
        form+= key + "=" + params[key] +"&"
    }
    return form ;
}

module.exports= loginService;