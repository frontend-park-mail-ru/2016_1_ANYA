define([
    'backbone'
], function(
    Backbone
){
    var viewManager = Backbone.View.extend({
        className: 'page',
        views: [],
        showView: function (thisView) {
            for (var viewIndex in this.views) {
                if (this.views[viewIndex] !== thisView) {
                    this.views[viewIndex].hide();
                }
            }
        },
        addView: function(view) {
            if (this.views.indexOf(view) == -1) {
                this.views.push(view.render());
                this.$el.append(view.$el);
                this.listenTo(view, 'show', this.showView.bind(this, view));
            }
        }

    });

    return new viewManager();
});
