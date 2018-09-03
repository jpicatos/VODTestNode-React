var express = require('express');
var https = require('https');
var session = require('express-session');
var morgan = require('morgan');


var cacheProvider = require('./cacheProvider');
var controller = require('./controllers/controller');


var app = express();

//settings
app.set('port', Number(process.env.PORT || 3000));



//set static files folder
app.use(express.static('./public'));

/** MIDDLEWARE **/

app.use(morgan('dev'));

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
app.listen(process.env.PORT || 3000);
/*log.Fatal(http.ListenAndServe(":" + os.Getenv("PORT"), router));*/
