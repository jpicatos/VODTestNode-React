var cacheableRequest = require('./cacheableRequest');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var urlencodedParse = bodyParser.urlencoded({extended: false});

//Connect to the database
mongoose.connect('mongodb://vodaccedo:vodaccedo123@ds115420.mlab.com:15420/vodaccedo');

//create DB schema
var vodaccedoSchema = new mongoose.Schema({
    itemIndex: Number,
    itemId: String,
    accessDateTime: String,
    imageUrl: String,
    videoUrl: String,
    title: String,
    category:String,
    type: String,
    lang: String
});


var VODAccedo = mongoose.model('History', vodaccedoSchema);


module.exports = function(app){
    
    app.get('/', function(req, res){
        cacheableRequest(function(results){
            res.render('index', {items: results, fetchData: require('../public/assets/js/fetchMetadata')});
        });
    });
    app.get('/video/:index/:id', function(req, res){
        cacheableRequest(function(results){
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            VODAccedo.find({itemId: results.entries[req.params.index].id}).remove(function(err, data){
                if(err) throw err;
                console.log(data);
            });
            VODAccedo({
                itemIndex: req.params.index,
                itemId: results.entries[req.params.index].id,
                accessDateTime: datetime,
                imageUrl: results.entries[req.params.index].images[0].url,
                videoUrl: results.entries[req.params.index].contents[0].url,
                title: results.entries[req.params.index].title,
                category:results.entries[req.params.index].categories[0].title,
                type: results.entries[req.params.index].type,
                lang: results.entries[req.params.index].metadata[0].value
            }).save(function(err){
                if(err) throw err;
                console.log('item saved');
            });

            res.render('video', {items: results, index: req.params.index, id: req.params.id, fetchData: require('../public/assets/js/fetchMetadata')});
        });
    });
    app.get('/history', function(req, res){
        VODAccedo.find({}, function(err, data){
            if(err) throw err;
            res.render('history', {items: data, number: data.length, fetchData: require('../public/assets/js/fetchMetadata')});
        });
        
    });
    app.delete('/history', function(req, res){
        VODAccedo.find({}).remove(function(err, data){
            if(err) throw err;
            res.render('history', {items: data, number: data.length, fetchData: require('../public/assets/js/fetchMetadata')});
        });
    });
    app.post('/history', urlencodedParse, function(req, res){
        VODAccedo.find({}, function(err, data){
            if(err) throw err;
            res.render('history', {items: data, number: req.body.number, fetchData: require('../public/assets/js/fetchMetadata')});
        });
    });
    app.get('*', function(req, res){
        res.render('404');
    });
}