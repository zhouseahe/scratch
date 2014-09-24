var request = require('request');
var cheerio = require("cheerio");
var config  = require('../settings').mongodb;
var mongoProxy = require('../services/mongo-adapter')(config);

/**
 * 读取题目
 * @param uri
 * @param form
 * @param cb
 */
module.exports = function parseUri(uri,cb){
    request({
        method: 'get',
        url: uri,
        form:''
    }, function(err, resp, body) {
        if (err) {
            console.log(err);
            return;
        }
        parse(body,cb);
    });

    var parse =  function(body,result,cb){
        $ = cheerio.load(body);
        var questions = $('div .quesdiv');
        for(var i = 0 ;i<questions.length; i++){
            var question = questions[i].children[1];
        }
//        mongoProxy.save('subject',result.subject,result,function(err,data){
//            if(err) {
//                throw err ;
//                return ;
//            }
//            cb();
//        });
    }

}
