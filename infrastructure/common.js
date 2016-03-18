var heroin = require('heroin-js');
var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

var base = {
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    addons: {mongolab: {plan: 'mongolab:sandbox'}},
    features: {
        'runtime-dyno-metadata': {enabled: false},
        'log-runtime-metrics': {enabled: false},
        'http-session-affinity': {enabled: false},
        preboot: {enabled: false},
        'http-shard-header': {enabled: false},
        'http-end-to-end-continue': {enabled: false}
    },
    formation: [{process: 'web', quantity: 1, size: 'Free'}]
};

module.exports = {
    config: base,
    configurator: configurator
};
