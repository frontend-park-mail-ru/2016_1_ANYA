define(function (require) {

    QUnit.module("views/viewManager");

    QUnit.test('viewManager does not add an already added view', function () {
        var mainView = require('views/main'),
            viewManager = require('views/viewManager');

        // yes, the below is a polyfill for bind.
        // why? because PhantomJS is an awful lib
        // built upon an old JS version, if you ask me
        // and these guys https://github.com/ariya/phantomjs/issues/10522
        if (Function.prototype.bind === undefined) {
            Function.prototype.bind = function ()
            {
                var fn = this,
                    args = Array.prototype.slice.call(arguments),
                    object = args.shift();
                return function ()
                {
                    return fn.apply(object,
                        args.concat(Array.prototype.slice.call(arguments)));
                };
           };
        }

        viewManager.addView(mainView);
        viewManager.addView(mainView);
        QUnit.ok(viewManager.views.length == 1, 'Success!');
    });

    QUnit.test('viewManager adds views', function (assert) {

        var gameView = require('views/game'),
            scoreboardView = require('views/scoreboard'),
            viewManager = require('views/viewManager');

        viewManager.addView(gameView);
        assert.notOk(viewManager.views.length != 2 || viewManager.views[viewManager.views.length - 1] != gameView, 'Second addition ok');

        viewManager.addView(scoreboardView);
        assert.notOk(viewManager.views.length != 3 || viewManager.views[viewManager.views.length - 1] != scoreboardView, 'Third addition ok');

    });

});
