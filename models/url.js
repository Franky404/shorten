var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  id:  String,
  long_url: String,
  count : {type: Number,default: 0},
  created_at: Date
});

console.log(urlSchema)

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;
