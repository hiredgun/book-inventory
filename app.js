var express = require('express');
var bodyParser = require('body-parser');

function logIncoming(req, res, next) {
    console.log('1 log incoming');
    next();
}

function auth(req, res, next) {
    console.log('2 auth');
    next();
}

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

module.exports = function(stockRepository) {
    var app = express();

    app.use(logIncoming);
    app.use(bodyParser.json());

    app.get('/', auth, function (req, res, next) {
        res.send('Hello World!');
    });


    app.post('/stock', function (req, res, next) {
        var isbn = req.body.isbn;
        var count = req.body.count;

        stockRepository.
            stockUp(isbn, count).
            then(function (result) {
                res.json({isbn: req.body.isbn, count: req.body.count});
            }).
            catch(next);
    });


    app.get('/stock/:isbn', function (req, res, next) {
        stockRepository.getCount(req.params.isbn).
            then(function (result) {
                if (result !== null) {
                    res.status(200).json({count: result});
                } else {
                    next();
                    //res.status(404).json({error: 'No book with ISBN: ' + req.params.isbn});
                }
            }).
            catch(next);
    });

    app.get('/stock', function (req, res, next) {
        stockRepository.
            findAll().
            then(function (docs) {
                res.json(docs);
            }).
            catch(next);
    });

    app.use(clientError);
    app.use(serverError);

    return app;
};