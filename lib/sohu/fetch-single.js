 var async = require('async');
//var argv = require('yargs').argv;
var request = require('request');

var xlsx = require('./export');

var dir = argv.page;

fs.readFile('./trans/link'+ dir +'.json', function(err, data) {
    if(err){
        console.log(err)
        return ;
    }
    var seeds = JSON.parse(data);
    async.mapLimit(seeds, 1, function(item,callback){
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
            parser.parseUniverse(item,body,callback);
        });
    },function(err, results){
        if(err){
            console.log(err);
            return ;
        }
        xlsx.export(results,dir,function(err){
            console.log(err);
        })
    });
});
