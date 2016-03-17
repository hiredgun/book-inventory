var _ = require('lodash.merge');
var baseConfig = require('./base').config;
var configurator = require('./base').configurator;

var test =
{
    name: 'book-inventory-pl-test-app',
    config_vars: {
        MONGOLAB_URI: process.env.MONGOLAB_URI,
        NAME: 'konrad2'
    }
};

var config = _.merge({}, baseConfig, test);

configurator(config);
