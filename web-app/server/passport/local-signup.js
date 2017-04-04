var LocalStrategy = require('passport-local').Strategy;
var models = require('../../db/models');

module.exports = new LocalStrategy ({
	passReqToCallback : true
}, function (request, username, password, done) {
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;

	//Check if password is long enough; otherwise send error.
	if (password.length < 8)
		return done(null, false, {message:'Password length must be at least 8 characters.'});

    models.User.create({
    	firstname: firstname,
    	lastname: lastname,
    	username: username,
    	password: models.User.hashPassword(password)
    }).then(function(user) {
    	//Create the user's first portfolio
    	models.Portfolio.create({ name: 'My First Portfolio'}).then(function (portfolio) {
    		user.addPortfolio(portfolio, { permission: 'admin' });
    		done(null, user);
    	});
    }).catch(function(error) {
    	console.log('Error: something wrong when creating new user: ' + error);
    	done(null, false, {message: JSON.stringify(error['errors'])});
    });
});
