var parseUri = require('../lib/parse-question-urls.js');

var seed = 'http://www.yitiku.cn/tiku/yuwen/';

for(var i = 1 ; i< 51; i++ ){
    parseUri(seed + i ,function(){
        console.log('finish : ' + i);
    });
}