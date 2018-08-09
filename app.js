var express = require('express');
var https = require('https');
var session = require('express-session');


var cacheProvider = require('./cacheProvider');
var controller = require('./controllers/controller');


var app = express();

//settings
app.set('port', Number(process.env.PORT || 3000));


//set view engine
app.set('view engine', 'ejs');


//set static files folder
app.use(express.static('./public'));

/** MIDDLEWARE **/
//Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Session cookies conf
app.use(session({
    secret: 'palabraSecreta',
    resave: false,
    saveUninitialized: true,
    expires: new Date(Date.now() + (30 * 86400 * 1000))
}));


//Start cache
cacheProvider.start(function(err){
    if(err){
        console.error(err);
    }
})

//fire controller
controller(app);


//listen to port
app.listen(app.get('port'), function(){
    console.log('Listening port ' + app.get('port'));
});
