var UserModel = require('../models/user');

module.exports = function (req, res, next) {
    var user = req.body;
    console.log(user);
    UserModel.findOne({user: user.name}, function(err, data){
        if(err) throw err;
        if(!data){
            res.status(401);
            res.json({error: 'error'});
        }
        else{
            if (data.password !== null && data.password === user.pass){
                req.username = user.name;
                next();
            }
            else{
                res.status(401);
                res.json({error: 'error'});
            }
        }
    });
    return;
}