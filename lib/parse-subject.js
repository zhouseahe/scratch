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
        for(var i =0 ;i <lis.length ; i ++){
            var item = lis[i];
            var unit = item.children[1].children[1];
            var unitName  = unit.attribs['title'];
            var unitUri = unit.attribs['href'];
            console.log(unitName + ' :  ' + unitUri);
            result[unitName] = unitName
            var unitDetails = item.children[2].children;
            for(var i =0 ;i <unitDetails.length ; i ++){
                var itemDetail = unitDetails[i];
                var current = itemDetail.children[1].children[1];
                var unitDetailName  = current.attribs['title'];
                var unitDetailUri = current.attribs['href'];
                console.log('   ' + unitDetailName + ' :  ' + unitDetailUri);
            }
        }
    }
}