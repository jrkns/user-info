// create an app.js file with the following contents
var express = require('express');
var app = express();

// Mongodb config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://asset_mapping:27017/user";

app.listen(3030, function(){
  console.log('Asset services (mongo) is running: @3030');
});

// Query API
app.get('/', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var query = { uname: req.query.username };
    db.collection("userProfile").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
  
});
