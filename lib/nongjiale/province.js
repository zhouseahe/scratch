
var http = require('http')
var cheerio = require("cheerio");
var iconv = require('iconv-lite');
//var xlsx = require('./export');
//var argv = require('yargs').argv;


module.exports = {
    getProvincePage :  function(url,index,cb){
        http.get(url  + index + '.html', function(res) {
            var chunks = [];
            res.on('data', function(chunk) {
                chunks.push(chunk);
            });
            res.on('end', function() {
                var decodedBody = iconv.decode(Buffer.concat(chunks), 'gb2312');
                var items = parseItem(decodedBody);
                cb(null,items);
            });
        });
    }
}

function parseItem(body){
    var items = [];
    $ = cheerio.load(body);
    var list = $('.e5njl li');
    for(var i = 0 ;i<list.length; i++){
        var title= list[i].children[2].attribs.title;
        var link= list[i].children[2].attribs.href;
        var name =list[i].children[4].children[0].data.replace("\r\n\t",'');
        var tel =list[i].children[4].children[2].data.replace("\r\n",'');
        //items.push({title:title,name:name,tel:tel,link:link});
        items.push([title,link,name,tel]);
    }
    return items;
}