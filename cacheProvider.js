let nodeCache = require('node-cache');
let cache = null;

var cacheFunc = {
    start: function(done){
        if(cache) return done();

        cache = new nodeCache();
    },
    instance: function(){
        return cache;
    }
}

module.exports = cacheFunc;