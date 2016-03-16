module.exports = {
    logIncoming: function (req, res, next) {
        console.log('1 log incoming');
        next();
    },
    clientError: function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },
    serverError: function (err, req, res, next) {
        res.status(err.status || 500);
        console.error(err.stack);
        res.json({message: err.message, error: (process.env.NODE_ENV === 'production') ? {} : err.stack.split('\n')});
    }
};
