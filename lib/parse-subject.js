var request = require('request');
var cheerio = require("cheerio");

module.exports = function createCatalog(uri,form, output , cb){
    request({
        method: 'post',
        url: uri,
        form: form
    }, function(err, resp, body) {
        if (err) {
            console.log(err);
            return;
        }
        parse(body,output);

    });

    var parse =  function(body,output,cb){
        var result = {};
        $ = cheerio.load(body);
        var lis = $('#root').children('li');
        parseItem(lis);
    }

    var parseItem = function(list){
        for(var i =0 ;i < list.length ; i ++){
            var item = list[i];
            var unit = item.children[1].children[1];
            var unitName  = unit.attribs['title'];
            var unitUri = unit.attribs['href'];
            console.log(unitName + ' :  ' + unitUri);
            if(item.children[2]){
                var unitDetails = item.children[2].children;
                parseItem(unitDetails);
            }

        }
    }
}
