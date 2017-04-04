module.exports = {
	currentUserSession: function(models, request, response) {
		var userID = request.session.passport.user;
    	models.User.findById(userID, {attributes: ['id', 'username', 'firstname', 'lastname']})
    	.then(function (user) {
        	response.end(JSON.stringify(user, null, 4));
		});
	}
}