define([
    'backbone'
],
function (
    Backbone
){

    var User = Backbone.Model.extend({

        restResource: 'backend/user',

        defaults: {
            username: '',
            password: '',
            id: undefined
        },

        validate: function(attrs, options) {
            var fields = ['username', 'password'];
            var errors = {};
            var hadErrors = false;
            fields.forEach(function (name) {
                if (!(attrs[name]) || attrs[name] === '') {
                    errors[name] = true;
                    hadErrors = true;
                }
                else {
                    errors[name] = false;
                }
            });
            if (hadErrors)
                return errors;
        },

        sync: function (method, model, options) {

            switch (method) {
                case 'create':
                    this.create(model, model.attributes.username, model.attributes.password);
                    break;
                case 'delete':
                    this.drop(model);
                    break;
                default:
                    console.log('whaaa?');
                    break;
            }
        },

        create: function (model, uname, pass, email) {

            var request = new XMLHttpRequest();

            request.open('PUT', this.restResource);

            request.setRequestHeader('Content-Type', 'application/json');

            request.onreadystatechange = (function (model) {
                if (this.readyState === 4) {
                    switch (this.status) {
                        case 200: {
                            model.set({id: JSON.parse(this.responseText).id});
                            model.trigger('invalid', {message: 'Successfully registered!'});
                            break;
                        }
                        case 403: {
                            model.trigger('invalid', {message: 'Such a user already exists!'});
                            break;
                        }
                        default: {
                            model.trigger('invalid', {message: 'Unknown error!'});
                            console.log(this.readyState + '-' + this.status + 'returned with "' + this.responseText + '" message');
                            break;
                        }
                    }
                }
              }).bind(request, model);

            var body = {
              'login': uname,
              'password': pass,
              'email': email
            };

            request.send(JSON.stringify(body));
        },

        edit: function () {
            console.log('this will contain the code to edit user info');
        },

        drop: function () {
            console.log('this will contain the code to drop the user');
        }
    });

    return User;
});
