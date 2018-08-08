var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var vodaccedoUserSchema = new mongoose.Schema({
    user: String,
    password: String
});

vodaccedoUserSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
vodaccedoUserSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', vodaccedoUserSchema);