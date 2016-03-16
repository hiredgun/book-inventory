var express = require('express');
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

app.get('/', auth, function (req, res, next) {
    res.send('Hello World!');
});

app.get('/stock', function(req, res, next) {
    res.send('Stock');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});