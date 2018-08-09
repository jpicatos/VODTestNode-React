var cacheableRequest = require('./cacheableRequest');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var UserModel = require('../models/user');
var HistoryModel = require('../models/historyModel');

var urlencodedParse = bodyParser.urlencoded({extended: false});

//Connect to the database
mongoose.connect('mongodb://vodaccedo:vodaccedo123@ds115420.mlab.com:15420/vodaccedo',{
    useNewUrlParser: true
});


module.exports = function(app){
    
    app.get('/', function(req, res){
        console.log(req.session);
        cacheableRequest(function(results){
            res.render('index', {items: results, fetchData: require('../public/assets/js/fetchMetadata'), session: req.session});
        });
    });
    app.get('/video/:index/:id', function(req, res){
        
            cacheableRequest(function(results){
                var currentdate = new Date(); 
                var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                HistoryModel.find({itemId: results.entries[req.params.index].id}).remove(function(err, data){
                    if(err) throw err;
                    console.log(data);
                });
                if(req.session.authenticated){
                    HistoryModel({
                        userId: req.session.user,
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
                }
                res.render('video', {items: results, index: req.params.index, id: req.params.id, fetchData: require('../public/assets/js/fetchMetadata'), session: req.session});
            });
    });
    app.get('/history', function(req, res){
        if(req.session.authenticated){
            HistoryModel.find({userId: req.session.user}, function(err, data){
                if(err) throw err;
                res.render('history', {items: data, fetchData: require('../public/assets/js/fetchMetadata'), session: req.session});
            });
        }
        else{
            res.render('historyNoAccess',{session: req.session});
        }
    });
    app.delete('/history', function(req, res){
        HistoryModel.find({}).remove(function(err, data){
            if(err) throw err;
            res.json({success: true});
        });
    });
    app.post('/history', urlencodedParse, function(req, res){
        HistoryModel.find({userId: req.session.user}, function(err, data){
            if(err) throw err;
            var numberItems = req.body.number
            if(req.body.number < 0 || req.body.number >= data.length){
                numberItems = data.length;
            }
            res.render('historyLimited', {items: data, number: numberItems, fetchData: require('../public/assets/js/fetchMetadata')});
        });
    });
    app.get('/login', function(req, res){
        res.render('login', {session: req.session});
    });
    app.post('/login', urlencodedParse, function(req, res){
        UserModel.findOne({user: req.body.user}, function(err, data){
            if(err) throw err;
            if(!data){
                res.json({error: 'Incorrect Username'});
            }
            if (data.password != null && data.password == req.body.pass){
                req.session.authenticated = true;
                req.session.user = req.body.user;
                res.json({error:'none'});
            }
            else{
                res.json({error: 'Incorrect password'});
            }
        });
    });
    app.get('/logout', function(req, res){
        req.session.destroy();
        res.redirect('/');
    });
    app.get('*', function(req, res){
        res.render('404');
    });
}