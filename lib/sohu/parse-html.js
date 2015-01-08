var cheerio = require("cheerio");
var url_prefix = 'http://daxue.learning.sohu.com';
//var url_prefix = 'http://daxue.learning.sohu.com/major/show-htm-page-';
//var url_suffix = '-catid-1182.html';

var Service = {};
Service.parseContent = function(body,cb){
    var result = [];
    try{
        $ = cheerio.load(body);
        var items = $('.tab_list2 table tbody tr');
        for(var i =1 ; i < items.length ; i++){
            try{
                result.push(parseItem(items[i]));
            }catch(e){
                console.log(e)
                break;
            }
        }
        cb(null,result) ;
    }catch(err){
        console.log(err);
        cb(err,null);
    }
}

function parseItem(item){
    var type = item.children[1].children[0].data ;
    var subject = item.children[3].children[0].data ;
    var name = item.children[5].children[0].children[0].data;
    var href = item.children[7].children[0].attribs.href;

    var result = {type:type , subject:subject , name :name , href :url_prefix + href};
    return result;
}

Service.parseUniverse = function(param ,body,cb){
    var result = {param:param};
    result.universes = [];
    var debug ='a';
    try{
        $ = cheerio.load(body);
        debug+='b'
        var items = $('.tab_list2 table tbody tr');
        debug+='c'
        for(var i =1 ; i < items.length-1 ; i++){
            try{
                debug+='d'
                parseUniverse(result,items[i]);
                debug+='e'
            }catch(e){
                console.log('ex: '+e);
                break;
            }
        }
        debug+='h'
        cb(null,result) ;
    }catch(err){
        console.log('debug: '+debug)
        console.log('error: ' +err);
        cb(null,null);
    }
}

function parseUniverse(box, item){
    var universe1 = item.children[1].children[0].children[0].data;
    box.universes.push(universe1);
    var universe2 = item.children[3].children[0].children[0].data;
    box.universes.push(universe2);
    var universe3 = item.children[5].children[0].children[0].data;
    box.universes.push(universe3);
}


Service.parseUniversePages = function(param ,body,cb){
    var result = [];
    try{
        $ = cheerio.load(body);
        var pages = $('.paging cite').text();
        var number = 1;
        if(pages){
            number = pages.substring(pages.indexOf('/')+1,pages.length-1);
        }
        param.pageNumber = number;
        cb(null,param);
    }catch(err){
        console.log(err);
        cb(err,null);
    }
}

module.exports = Service;
