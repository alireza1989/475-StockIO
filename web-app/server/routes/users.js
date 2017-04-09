module.exports = {
	currentUserSession: function(models, request, response) {
		if (request.session.passport) {
			var userID = request.session.passport.user;
	    	models.User.findById(userID, {attributes: ['id', 'username', 'firstname', 'lastname']})
	    	.then(function (user) {
	        	response.end(JSON.stringify(user, null, 4));
			});
		}
		else 
        	response.status(306).send(JSON.stringify({user: null }));
	}
}