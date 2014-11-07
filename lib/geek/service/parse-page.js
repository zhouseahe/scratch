var request = require('request');
var cheerio = require("cheerio");
var itemService = require('./parse-item');

var data = [];

var service = {
    parsePage :function (url){
        request({
            method: 'get',
            url:url ,
            form:''
        }, function(err, resp, body) {
            if (err) {
                console.log(err);
                return;
            }
            parseContent(body);
        });
    },
    getResult:function(){
        return data;
    }
}

function parseContent(body){
    $ = cheerio.load(body);
    var items = $('div .ue-video-list-show');
    for(var i =0 ; i < items.length ; i++){
        parseItem(items[i])
    }

}

function parseItem(item){
    var title = item.children[1].children[0].children[0].data;
    var time = item.children[2].children[1].children[0].data.split(',');
    var times = time[0];
    var long = time[1];
    var star = item.children[3].children[1].children[0].data;
    var date = item.children[3].children[2].children[0].data;
    // console.log(title + " | " + time + " | " + star + " | " + date);
    var record = [];
    record.push(title);
    record.push(times);
    record.push(long);
    record.push(star);
    record.push(date);
    data.push(record);
}

module.exports = service ;
