var category = require('./category-page');
var universe = require('./universe-page');
var url_prefix = 'http://daxue.learning.sohu.com/major/search-htm-page-';
var url_suffix  = '-kw-.html';
var fs = require('fs');
var async = require('async');

var param={
    category:30,
    url_prefix:url_prefix,
    url_suffix:url_suffix
};


category.categoryPage(param ,function(err, results){
    if(err){
        console.log(err)
    }
    console.log('category success');
    var number = 18;
    async.mapLimit(results, 1, function(page,callback){
        number ++;
        console.log(number)
        universe.universePages(page,function(error,data){
            var category = JSON.stringify(data);
            fs.writeFile('./tmp/category' + number  + '.json', category, function(err) {
                if(err){
                    console.log(err)
                }
               callback(null,number);
            });
        });
    },function(err, results){
        if(err){
            console.log(err);
            cb(err,null);
            return ;
        }
        console.log(results)
    });

});