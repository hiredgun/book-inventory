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

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/book_inventory_store';
var collection = null;

var collectionPromise = MongoClient.
    connect(url).
    then(function (db) {
        return db.collection('books');
    });

app.post('/stock', function (req, res, next) {
    var isbn = req.body.isbn;
    var count = req.body.count;

    collectionPromise.
        then(function (collection) {
            //throw new Error('sth bad');
            return collection.updateOne(
                {isbn: isbn},
                {isbn: isbn, count: count},
                {upsert: true});
        }).
        then(function (result) {
            res.json({isbn: req.body.isbn, count: req.body.count});
        }).
        catch(next);

});


app.get('/stock', function (req, res, next) {
    collectionPromise.
        then(function (collection) {
            return collection.find({}).toArray();
        }).
        then(function (docs) {
            res.json(docs);
        }).
        catch(next);
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