var async = require('async');
var http = require('http')
var cheerio = require("cheerio");
var iconv = require('iconv-lite');
//var xlsx = require('./export');
//var argv = require('yargs').argv;


module.exports = {
    getProvincePage :  function(domain,page,cb){
        http.get(domain + "/" + page, function(res) {
            var chunks = [];
            res.on('data', function(chunk) {
                chunks.push(chunk);
            });
            res.on('end', function() {
                var decodedBody = iconv.decode(Buffer.concat(chunks), 'gb2312');
                parseItem(decodedBody);
            });
        });
    }
}

function parseItem(body){
    $ = cheerio.load(body);
    var list = $('.e5njl li');
    for(var i = 0 ;i<list.length; i++){
        var title= list[i].children[2].attribs.title;
        var name =list[i].children[4].children[0].data;
        var tel =list[i].children[4].children[2].data;
        console.log(name)
    }
}