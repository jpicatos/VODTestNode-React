var cacheableRequest = require('./cacheableRequest');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var UserModel = require('../models/user');
var HistoryModel = require('../models/historyModel');
var auth = require('./basicAuth');

var urlencodedParse = bodyParser.urlencoded({extended: false});

//Cors
const corsEnabled = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};
//Connect to the database
mongoose.connect('mongodb://vodaccedo:vodaccedo123@ds115420.mlab.com:15420/vodaccedo',{
    useNewUrlParser: true
});


module.exports = function(app){
    
    app.get('/api/content', corsEnabled, cacheableRequest, function(req, res){
       res.json(req.result);
    });
    app.get('/api/video/:id', corsEnabled, cacheableRequest, function(req, res){
            var results = req.result;
            var index = -1;
            for (var i = 0; i < results.entries.length; i++){
                if (results.entries[i].id === req.params.id){
                   index = i;
                }
              }
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            var jsonVideo = {
                userId: req.session.user,
                itemIndex: index,
                itemId: req.params.id,
                accessDateTime: datetime,
                imageUrl: results.entries[index].images[0].url,
                videoUrl: results.entries[index].contents[0].url,
                title: results.entries[index].title,
                category:results.entries[index].categories[0].title,
                type: results.entries[index].type,
                lang: results.entries[index].metadata[0].value,
                description: results.entries[index].description
            };
            if(req.session.authenticated){
                HistoryModel.find({itemId: req.params.id, userId: req.session.user}).remove(function(err, data){
                    if(err) throw err;
                });
                HistoryModel({jsonVideo}).save(function(err){
                    if(err) throw err;
                    console.log('item saved');
                });
            }
        res.json(jsonVideo);            
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
    app.delete('/history/:id', function(req, res){
        HistoryModel.find({itemId: req.params.id, userId: req.session.user}).remove(function(err, data){
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
    app.post('/login',urlencodedParse, auth, function(req, res){
        console.log(req.session)
        req.session.authenticated = true;
        req.session.user = req.username;
        res.redirect('/');
    });
    app.get('/register', function(req, res){
        res.render('register', {session: req.session});
    });
    app.post('/register', urlencodedParse, function(req, res){
        if (req.body.pass1 === req.body.pass2) {
            UserModel.findOne({user: req.body.user}, function(err, data){
                if(err) throw err;
                if(!data){
                    UserModel({
                        user: req.body.user,
                        password: req.body.pass1,
                    }).save(function(err){
                        if(err) throw err;
                        res.status(200);
                        console.log('item saved');
                    });
                    res.status(200);
                    res.json({error:'none'});
                }
                else{
                    res.status(400);
                    res.json({error: 'Incorrect Username'});
                }
            });
        }
        else{
            res.status(401);
            res.json({error: 'Incorrect password'});
        }
    });
    app.get('/logout', function(req, res){
        req.session.destroy();
        res.status(401);
        res.redirect('/');
    });
    /*app.get('*', function(req, res){
        res.render('404');
    });*/
}