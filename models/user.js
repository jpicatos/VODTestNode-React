var mongoose = require('mongoose');

var vodaccedoUserSchema = new mongoose.Schema({
    user: String,
    password: String
});


module.exports = mongoose.model('User', vodaccedoUserSchema);