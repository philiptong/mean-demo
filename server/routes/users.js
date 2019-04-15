var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://192.168.56.102:27017/';

function insert() {
  mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    var user = { id: 100001, name: 'philip' };
    var collection = client.db('mean-demo').collection('users');
    collection.insertOne(user, (err, res) => {
      if (err) throw err;
      console.log('1 user inserted');
    });
  });
}

async function find(id) {
  return mongoClient.connect(url, { useNewUrlParser: true }).then(client => {
    var collection = client.db('mean-demo').collection('users');
    if (id) {
      return collection.find({ id }).toArray();
    } else {
      return collection.find().toArray();
    }
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  find('100001').then(
    record => {
      if (record.length > 0) {
        console.log('record exists : ' + JSON.stringify(record));
      } else {
        console.log('record not exist, will try to insert');
        insert();
      }
      find().then(
        users => {
          console.info('The promise was fulfilled with items!', users);
          res.end(JSON.stringify(users));
        },
        err => {
          console.error('The promise was rejected', err, err.stack);
        }
      );
    },
    err => {
      console.error('The promise was rejected', err, err.stack);
    }
  );
});

module.exports = router;
