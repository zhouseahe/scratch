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
        var page = uri.replace('http://www.yitiku.cn/tiku/yuwen/','');
        parse(body,page,cb);
    });

    var parse =  function(body,page,cb){
        $ = cheerio.load(body);
        var questions = $('div .quesdiv');
        var qs = [];
        for(var i = 0 ;i<questions.length; i++){
            var question = questions[i].children[1];
            qs.push(question.attribs['href']);
        }
        var pageQ = {page:page,questions:qs};
        console.log(pageQ)
        mongoProxy.save('page',page,pageQ,function(err,data){
            if(err) {
                throw err ;
                return ;
            }
            cb();
        });
    }

}
