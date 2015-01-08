var url_prefix = 'http://daxue.learning.sohu.com';

var request = require('request');
var async = require('async');
var parser = require('./parse-html');

var Service ={};

Service.universePage=  function(param,cb){
    async.mapLimit(param, 1, function(item,callback){
        request({
            method: 'get',
            url:item.href ,
            form:''
        }, function(err, resp, body) {
            if (err) {
                console.log(err);
                callback(err,null);
                return;
            }
            parser.parseUniverse(body,callback);
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


Service.universePages =  function(page,cb){
    async.mapLimit(page, 1, function(item,callback){
        request({
            method: 'get',
            url:item.href ,
            form:''
        }, function(err, resp, body) {
            if (err) {
                console.log(err);
                callback(err,null);
                return;
            }
            parser.parseUniversePages(item,body,callback);
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