define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    collection
){

    var ScoresView = Backbone.View.extend({

        className: 'scoreboard-view',

        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            collection.add();
            //collection.sort();
            this.$el.html(this.template({
                players: collection
            }));
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

    return new ScoresView();
});
