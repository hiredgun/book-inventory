module.exports = function(stockRepository) {
    return {
        stockUp: function (req, res, next) {
            var isbn = req.body.isbn;
            var count = req.body.count;

            stockRepository.
                stockUp(isbn, count).
                then(function (result) {
                    res.json({isbn: req.body.isbn, count: req.body.count});
                }).
                catch(next);
        },
        getCount: function (req, res, next) {
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
        },
        findAll: function (req, res, next) {
            stockRepository.
                findAll().
                then(function (docs) {
                    res.json(docs);
                }).
                catch(next);
        }
    };
};