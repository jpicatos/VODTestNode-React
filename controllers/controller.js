var request = require('request');
module.exports = function(app){
    var options = {
        url: 'https://sela-test.herokuapp.com/assets/hkzxv.json',
        headers: {
            'content-type': 'application/json'
        }
    };
    app.get('/', function(req, res){
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.render('index', {items: JSON.parse(body), fetchData: require('../public/assets/js/fetchMetadata')});
            }
        });
    });
    app.get('/video/:index/:id', function(req, res){
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.render('video', {items: JSON.parse(body), index: req.params.index, id: req.params.id, fetchData: require('../public/assets/js/fetchMetadata')});
            }
        });
    });
    app.get('*', function(req, res){
        res.render('404');
    });
}