var province = require('./province.js');

var domain = 'http://www.22bw.com/beijingnongjiale';
var page = 'list_2_1.html';

province.getProvincePage(domain,page,function(err,body){
    if(err){
        console.log(err);
        return ;
    }
    console.log(body);
});
