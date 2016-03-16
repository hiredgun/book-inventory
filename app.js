var express = require('express');
var bodyParser = require('body-parser');
var app = express();

function logIncoming(req, res, next) {
    console.log('1 log incoming');
    next();
}

function auth(req, res, next) {
    console.log('2 auth');
    next();
}

app.use(logIncoming);
app.use(bodyParser.json());

app.get('/', auth, function (req, res, next) {
    res.send('Hello World!');
});


app.post('/stock', function (req, res, next) {
    var MongoClient = require('mongodb').MongoClient
    var url = 'mongodb://localhost:27017/book_inventory_store';

    var isbn = req.body.isbn;
    var count = req.body.count;

    MongoClient.connect(url, function (err, db) {
        db.collection('books').updateOne(
            {isbn: isbn},
            {isbn: isbn, count: count},
            {upsert: true});
        console.log("Connected correctly to server");

    });
    res.json({isbn: req.body.isbn, count: req.body.count});
});

app.get('/stock', function(req, res) {
    var MongoClient = require('mongodb').MongoClient;

    var url = 'mongodb://localhost:27017/book_inventory_store';
    MongoClient.connect(url, function (err, db) {
        return db.collection('books').find({}).toArray(function(err, docs) {
            res.json(docs);
        });
    });
});

app.use(clientError);
app.use(serverError);

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}
function serverError(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);
    res.json({message: err.message, error: (process.env.NODE_ENV === 'production') ? {} : err.stack.split('\n')});
}

module.exports = app;