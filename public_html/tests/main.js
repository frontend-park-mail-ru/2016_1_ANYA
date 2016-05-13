require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        pixi: "lib/pixi"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

var tests = [
    'models/score.test',
    'views/viewManager.test',
    'models/collections.test'
];

require(tests, function () {
    QUnit.load();
    QUnit.start();
});
