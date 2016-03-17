var _ = require('lodash');
var baseConfig = require('./base').config;
var configurator = require('./base').configurator;

var prod =
{
    name: 'book-inventory-pl',
    config_vars: {
        MONGOLAB_URI: process.env.MONGOLAB_URI,
        NAME: 'konrad3'
    }
};

var config = _.merge({}, baseConfig, prod);

configurator(config);
