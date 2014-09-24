var request = require('request');
var cheerio = require("cheerio");
var config  = require('../settings').mongodb;
var mongoProxy = require('../services/mongo-adapter')(config);

module.exports = function createCatalog(uri,form,cb){
    request({
        method: 'post',
        url: uri,
        form: form
    }, function(err, resp, body) {
        if (err) {
            console.log(err);
            return;
        }
        var subject = uri.replace('http://www.yitiku.cn/tiku/','');

        var result = {subject :subject};
        parse(body,result,cb);
    });

    var parse =  function(body,result,cb){
        $ = cheerio.load(body);
        var units = $('#root').children('li');
        parseItem(units,result);
        mongoProxy.save('subject',result.subject,result,function(err,data){
            if(err) {
                throw err ;
                return ;
            }
            cb();
        });
    }

    var parseItem = function(units,result){
        for(var i =0 ;i < units.length ; i ++){
            var item = units[i];
            var unit = item.children[1].children[1];
            var unitName  = unit.attribs['title'];
            var unitUri = unit.attribs['href'];
            result[unitName] = { uri:unitUri,data:{} };
            if(item.children[2]){
                var unitDetails = item.children[2].children;
                parseItem(unitDetails, result[unitName].data);
            }
        }
    }
}
