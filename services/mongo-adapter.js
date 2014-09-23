var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

function MongodbAdatper(config) {
    this.config = config;
    this.init();
}
MongodbAdatper.prototype.save = function(scope, key, obj, cb) {
    obj._key = key;
    delete obj._id;
    this.collection(scope).update({
        _key: key
    }, {
        $set: obj
    }, {
        upsert: true
    }, cb);
}
MongodbAdatper.prototype.find = function(scope, key, cb) {
    if (Array.isArray(key)) {
        this.collection(scope).findOne({
            _key: {
                $in: key
            }
        }, cb);
    } else {
        this.collection(scope).findOne({
            _key: key
        }, cb);
    }
}
MongodbAdatper.prototype.delete = function(scope, key, cb) {
    if (Array.isArray(key)) {
        this.collection(scope).remove({
            _key: {
                $in: key
            }
        }, cb);
    } else {
        this.collection(scope).remove({
            _key: key
        }, cb);
    }
}
MongodbAdatper.prototype.collection = function(scope) {
    var prefix = this.config.prefix;
    var name = scope;
    if (prefix) name = prefix + '_' + scope;
    return this.db.collection(name);
}
MongodbAdatper.prototype.init = function() {
    var self = this;
    this.client = MongoClient.connect(this.config.url, {
        native_parser: true
    }, function(err, db) {
        if (err) throw err;
        self.db = db;
    });
}
function logErr(err) {
    if (err) console.log(err);
}

function setup(config) {
    return new MongodbAdatper(config);
}
module.exports = setup;