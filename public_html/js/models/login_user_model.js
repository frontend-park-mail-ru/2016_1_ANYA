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
			console.log(attrs);
			var listErrors = {};
			if (attrs.username === '') {
				listErrors.username = true;
			}
			if (attrs.password === '') {
				listErrors.password = true;
			}
			if (listErrors) {
				console.log(listErrors);
				return listErrors;
			}

		}
	});

	return LoginUserModel;
});