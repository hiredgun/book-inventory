var _ = require('lodash');
var baseConfig = require('./common').config;
var configurator = require('./common').configurator;

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
