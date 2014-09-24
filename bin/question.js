var parseUri = require('../lib/parse-question-urls.js');

var seed = 'http://www.yitiku.cn/tiku/yuwen/1';


parseUri(seed,function(){
    console.log('finish');
});