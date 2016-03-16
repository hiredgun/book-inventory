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

app.get('/stock', function (req, res, next) {
    throw new Error("database migration - fancy word for downtime");
    res.send('Stock');
});

app.post('/stock', function(req, res, next) {
    res.json({isbn: req.body.isbn, count: req.body.count});
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
    res.json({message: err.message, error: (process.env.NODE_ENV === 'production') ? {} : err.stack});
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});