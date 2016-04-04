define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var GameView = Backbone.View.extend({

        className: 'game-view',

        template: tmpl,

        initialize: function () {
            // TODO
        },
        render: function () {
            this.$el.html(this.template());
            require(['./js/game.js']);
            return this;
        },
        show: function () {
            this.trigger('show');
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },

    });

    return new GameView();
});
