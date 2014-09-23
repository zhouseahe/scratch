var config  = require('../settings').mongodb;
var mongoProxy = require('../services/mongo-adapter')(config);
var assert = require("assert");

describe('User', function(){
    describe('#save()', function(){
        it('should save without error', function(done){
            mongoProxy.save('user',null,{name:'zhoushaohe'},function(err,data){
                if(err) {
                    throw err ;
                    return ;
                }
                console.log(data);
                done();
            })
        })
    })
});