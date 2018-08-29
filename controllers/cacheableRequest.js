var request = require('request');
var cacheProvider = require('./../cacheProvider');

const CACHE_DURATION = 720; // 12 minutes
const CACHE_KEY = 'DATAx';


module.exports = function(cb){
    var options = {
        url: 'https://sela-test.herokuapp.com/assets/hkzxv.json',
        headers: {
            'content-type': 'application/json'
        }
    };
    cacheProvider.instance().get(CACHE_KEY, function(err, value){
        if(err) console.error(error);
        if(true){
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    jsonResData = JSON.parse(body);
                    /*cacheProvider.instance().set(CACHE_KEY, jsonResData, CACHE_DURATION, function(err, success){
                        if(!err && success){
                            cb(jsonResData);
                        }
                    });*/
                    cb(jsonResData)
                }
            });
        }
        else{
            cb(value);
        }
    });
}