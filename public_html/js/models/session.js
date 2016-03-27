define([
    'backbone'
], function(
    Backbone
){

	var LoginUserModel = Backbone.Model.extend({
		defaults: {
			username: '',
			password: ''
		},

		validate: function(attrs, options) {
			fields = ['username', 'password'];
			errors = {};
			fields.forEach(function (name) {
				if (attrs[name] === '') {
					errors[name] = true;
				}
                else {
                    errors[name] = false;
                }
			});
			return errors;

		}
	});

	return LoginUserModel;
});
