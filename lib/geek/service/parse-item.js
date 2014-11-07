var cheerio = require("cheerio");

var service ={
    parseContent:function parseContent(body,cb){
        var result = [];
        try{
            $ = cheerio.load(body);
            var items = $('div .ue-video-list-show');
            for(var i =0 ; i < items.length ; i++){
                result.push(parseItem(items[i]));
            }
            cb(null,result) ;
        }catch(err){
            cb(err,null);
        }
    }
};

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
    return record;
}

module.exports = service;
