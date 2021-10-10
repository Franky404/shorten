//Module
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var shortid = require('shortid');
var linkCheck = require('link-check');
// DB
var Url = require('./models/url');
mongoose.connect(`${config.db}`);
// App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.post('/api/shorten', function(req, res){
  var longUrl = req.body.url;
    var shortUrl = shortid.generate();
    Url.findOne({long_url: longUrl}, function (err, doc){
      if (doc){
        shortUrl = config.webhost + doc.id;
        console.log(doc.id);
        res.send({'shortUrl': shortUrl,success:1});
      } else {
        var newUrl = Url({
          long_url: longUrl,
          id:shortUrl
        });
        newUrl.save(function(err) {
          if (err){
            console.log(err);
          }
          shortUrl = config.webhost + newUrl.id;
          console.log(newUrl.id);
          res.send({'shortUrl': shortUrl,success:1});
        });
      }
    });
});
app.post('/api/custom', function(req, res){
  var url = req.body.url.split("/");
  var custom = req.body.custom;
  url = url[url.length-1];
  console.log(custom);
  Url.findOne({id:custom},function (error,doc){
  if (!doc){
    Url.findOneAndUpdate({id:url},{$set: {id:custom}},{new:true},function(error, data) {
      // console.log(data);
      if (error){
                res.send({'shortUrl': error,'success': 0}) ;
                }
      else{      shortUrl = config.webhost + data.id;
      res.send({'shortUrl': shortUrl,'success': 1});
      }})
      }
  else{
    res.send({'success': 0})
  }  
  });
  })
app.get('/:encoded_id', function(req, res){
  var id1 = req.params.encoded_id;
  console.log(id1)
  Url.findOne({id: id1}, function (err, doc){
    if (doc) {
      Url.findOneAndUpdate({id:id1},{$set:{count:doc.count+1}},{new:true},function(err,doc1){
        console.log(doc1.long_url + " count: "+ doc1.count)
      })
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });
});
// Running Port
const PORT = process.env.PORT || '5000'
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
