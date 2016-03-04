define([
    'backbone',
    'tmpl/login',
    'models/login_user_model'
], function(
    Backbone,
    tmpl,
    LoginUser
){

    var LoginView = Backbone.View.extend({

        tagName: 'div',

        events: {
            "click .button_submit": "validate",
            //"submit .button_submit": "validate",
            "submit .login": "validate",
            "change .login": "changeLogin",
            "change .password": "changePassword"
        },

        
        showError: function (container, errorMessage) {
            container.className = 'error';
            var msgElem = document.createElement('span');
            msgElem.className = "error-message";
            msgElem.innerHTML = errorMessage;
            container.appendChild(msgElem);
        },

        resetError: function (container) {
            container.className = '';
            if (container.lastChild.className == "error-message") {
                container.removeChild(container.lastChild)
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
            // TODO
            
        },
        
        render: function () {
            this.$el.html(this.template());
            this.model = new LoginUser();
            
            this.model.on("invalid", function(model, error) {
                if (error.username) {
                    this.showError(this.elems.username.parentNode, "No username!");
                }
                if (error.password) {
                    this.showError(this.elems.password.parentNode, "No password!");
                }
            }.bind(this));

            return this;
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        },

    });

    

    return new LoginView();
});