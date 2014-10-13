var request = require('request');
var cheerio = require("cheerio");

module.exports = function visit(domain,times) {
    loadWenda(domain,times);
}

function loadWenda(domain,times){
    request({
        method: 'get',
        url: domain + '/wenda',
        form:''
    }, function(err, resp, body) {
        if (err) {
            console.log(err);
            return;
        }
        visit(body,domain,times);
    });
}

function visit(body,domain,times){
    $ = cheerio.load(body);
    var titles = $('.wendatitle','div');
    var uri = '' ;
    var url = '';
    for(var j = 0 ; j < titles.length;j++){
        uri = titles[j].attribs.href;
        url = domain + uri;
        get(url,times);
    }
}

function get(url,times){
    for(var i = 0 ; i < times ; i++   ){
        request({
            method: 'get',
            url:url ,
            form:''
        }, function(err, resp, body) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(url + ' :  '  +resp.statusCode)
        });
    }
}
