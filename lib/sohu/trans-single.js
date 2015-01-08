var fs =require('fs');
var argv = require('yargs').argv;

var prefix = 'http://daxue.learning.sohu.com/major/show-htm-page-';

var dir = argv.page;

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
    fs.writeFile('./trans/link'+ dir +'.json',subject,function(err){
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

