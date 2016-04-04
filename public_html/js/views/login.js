define([
    'backbone',
    'tmpl/login',
    'models/session'
], function(
    Backbone,
    tmpl,
    LoginUser
){
    var LoginView = Backbone.View.extend({

        className: 'login-view',

        events: {
            "submit": "validate"
        },


        showError: function (container) {
            container.addClass('form__error_shown');
            var msgElem = container.children('.form__error');
            var formElem = container.children('.form__input');
            msgElem.addClass('form__error_shown');
            formElem.addClass('form__input_error');
        },

        resetError: function (container) {
            container.removeClass('form__error_shown');
            var msgElem = container.children('.form__error');
            var formElem = container.children('.form__input');
            msgElem.removeClass('form__error_shown');
            formElem.removeClass('form__input_error');
        },

        handleErrors: function(model, error) {
            console.log(error);
            this.resetError(this.$el.find('.form__username'));
            this.resetError(this.$el.find('.form__password'));
            if (error.username) {
                this.showError(this.$el.find('.form__username'));
            }
            if (error.password) {
                this.showError(this.$el.find('.form__password'));
            }
        },

        validate: function (event) {
            if (event) {
                event.preventDefault();
            }

            var nativeForm = $('form')[0]
            this.elems = nativeForm.elements;

            this.model.save({
                'username': this.elems.username.value,
                'password': this.elems.password.value
            });
        },

        template: tmpl,
        initialize: function () {
            this.model = new LoginUser();
            this.model.on("invalid", this.handleErrors.bind(this));
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            this.trigger('show');
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
            this.resetError(this.$el.find('.form__username'));
            this.resetError(this.$el.find('.form__password'));
        },

    });



    return new LoginView();
});
