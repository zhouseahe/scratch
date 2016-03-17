var province = require('./province.js');
var async = require('async');
var xlsx = require('./exportService.js');

var base_url = 'http://www.22bw.com/beijingnongjiale/list_2_';
var header = ['名称','链接','联系人','电话'];



var indexs = [] ;
for(var i =1 ;i<27;i++){
    indexs.push(i++);
}
async.mapLimit(indexs, 1, function(idx,cb){
    province.getProvincePage(base_url,idx,function(err,items){
        if(err){
            console.log(err);
            return ;
        }
        cb(null,items)
    });
},function(err, results){
    if(err){
        console.log(err);
        return ;
    }
    var source = [];
    for(var i =0;i<results.length;i++){
        source = source.concat(results[i]);
    }
    xlsx.export(header,source,function(re){
        console.log(re)
    });
});
