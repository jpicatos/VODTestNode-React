var mongoose = require('mongoose');

//create DB schema
var vodaccedoSchema = new mongoose.Schema({
    userId: String,
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



module.exports = mongoose.model('History', vodaccedoSchema);