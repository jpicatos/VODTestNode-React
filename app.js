var express = require('express');
var https = require('https');


var cacheProvider = require('./cacheProvider');
var controller = require('./controllers/controller');


var app = express();

//set view engine
app.set('view engine', 'ejs');


//set static files folder
app.use(express.static('./public'));

//Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Start cache
cacheProvider.start(function(err){
    if(err){
        console.error(err);
    }
})

//fire controller
controller(app);


//listen to port
app.listen(3000);
console.log('Listening port 3000');