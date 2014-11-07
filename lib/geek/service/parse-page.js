var request = require('request');
var cheerio = require("cheerio");
var async = require('async');
var itemService = require('./parse-item');

var service = {
    getPages : function(param,cb){
            var urls = [];
            for(var i = 1 ; i < param.pageNumber + 1 ; ++i){
                urls.push(param.base + i);
            }
            async.mapLimit(urls, 1, function(url,cb){
                request({
                    method: 'get',
                    url:url ,
                    form:''
                }, function(err, resp, body) {
                    if (err) {
                        cb(err,null);
                        return;
                    }
                    console.log( url + " : 返回状态： " + resp.statusCode);
                    itemService.parseContent(body,cb);
                });
            },function(err, results){
                if(err){
                    cb(err,null);
                    return ;
                }
                cb(null,reFactor(results));
            });
    }
}

function reFactor(results){
    var data = [];
    for(var i =0;i<results.length;i++){
        for(var j =0 ; j < results[i].length;j++){
            data.push(results[i][j]);
        }
    }
    return data;
}

module.exports = service ;
