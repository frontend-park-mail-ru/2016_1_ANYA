define(function(require){

    var Backbone = require('backbone'),
        mainView = require('views/main'),
        loginView = require('views/login'),
        gameView = require('views/game'),
        scoreboardView = require('views/scoreboard'),
        registerView = require('views/register'),
        viewManager = require('views/viewManager');

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'register': 'registerAction',
            '*default': 'defaultActions'
        },

        manageView: function (view) {
            viewManager.addView(view);
            view.show();
        },

        defaultActions: function () {
            this.manageView(mainView);
        },
        scoreboardAction: function () {
            this.manageView(scoreboardView);
        },

        gameAction: function () {
            this.manageView(gameView);
        },

        loginAction: function () {
            this.manageView(loginView);
        },

        registerAction: function () {
            this.manageView(registerView);
        }

    });

    return new Router();
});
