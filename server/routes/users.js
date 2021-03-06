require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL;
var user = { id: 100001, name: 'philip' };
var dbName = 'mean-demo';
var collectionName = 'users';

async function insert() {
  return mongoClient.connect(url, { useNewUrlParser: true }).then(client => {
    var collection = client.db(dbName).collection(collectionName);
    return collection.insertOne(user);
  });
}

async function find(id) {
  return mongoClient.connect(url, { useNewUrlParser: true }).then(client => {
    var collection = client.db(dbName).collection(collectionName);
    if (id) {
      return collection.find({ id }).toArray();
    } else {
      return collection.find().toArray();
    }
  });
}

function findAll(res) {
  find().then(
    users => {
      console.info('users found : ', users);
      res.end(JSON.stringify(users));
    },
    err => {
      console.error('find record error : ', err, err.stack);
    }
  );
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  find(user.id).then(
    record => {
      if (record.length > 0) {
        console.log('record exists : ' + JSON.stringify(record));
        findAll(res);
      } else {
        console.log('record not exist, will try to insert');
        insert().then(
          result => {
            console.log('insert result : ' + result);
            findAll(res);
          },
          err => {
            console.log('insert error : ', err, err.stack);
          }
        );
      }
    },
    err => {
      console.error('find record error : ', err, err.stack);
    }
  );
});

module.exports = router;
