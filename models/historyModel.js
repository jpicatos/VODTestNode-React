var mongoose = require('mongoose');

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



module.exports = mongoose.model('History', vodaccedoSchema);