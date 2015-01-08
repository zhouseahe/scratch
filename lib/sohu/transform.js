var fs =require('fs');
var async = require('async');

var prefix = 'http://daxue.learning.sohu.com/major/show-htm-page-';

var seeds = [];
for(var i = 1; i< 30 ; i++){
    seeds.push(i);
}
async.mapLimit(seeds, 1, function(dir,callback){
    fs.readFile('./tmp/category' + dir+ '.json', function(err, data) {
        if(err){
            console.log(err)
            callback(err,null);
        }
        var result = [];
        var subject = JSON.parse(data);
        var item ;
        for(var i = 0 ;i < subject.length ;i++){
            item = subject[i];
            if(item.pageNumber>1){
                for(var j =2 ; j <= item.pageNumber ; j ++){
                    result.push(buildURL(item,j));
                }
            }
        }
        subject = JSON.stringify(subject.concat(result));
        //console.log( subject)
        callback(null,subject);
    });
},function(err, results){
    if(err){
        console.log(err);
        cb(err,null);
        return ;
    }
    console.log(results.length)
    fs.writeFile('./trans/links.json',results,function(err){
        console.log(err)
    });
});

function buildURL(item,num){
    var url = item.href;
    var id = url.substring(url.length-5);
    var mid = '' + num + '-catid-';
    var href = prefix + mid + id + '.html';
    return {type:item.type,subject:item.subject,name:item.name,href:href}
}

