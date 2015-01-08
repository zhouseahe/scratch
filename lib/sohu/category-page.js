var request = require('request');
var async = require('async');
var parser = require('./parse-html');

var Service ={};

Service.categoryPage = function(param,cb){
    var urls = [];
    for(var i = 19 ; i  < param.category; i++){ //param.category
        urls.push(param.url_prefix + i +param.url_suffix);
    }
    async.mapLimit(urls, 1, function(url,callback){
        request({
            method: 'get',
            url:url ,
            form:''
        }, function(err, resp, body) {
            if (err) {
                console.log(err);
                callback(err,null);
                return;
            }
            parser.parseContent(body,callback);
        });
    },function(err, results){
        if(err){
            console.log(err);
            cb(err,null);
            return ;
        }
        cb(null,results)
    });
}

module.exports = Service;