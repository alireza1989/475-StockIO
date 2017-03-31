var LocalStrategy = require('passport-local').Strategy;
var models = require('../../db/models');

module.exports = new LocalStrategy(function (username, password, done) {
	models.User.findOne({where: {username: username}}).then(function(user) {
		if (!user)
			return done(null, false, { message: 'Incorrect username'});

		var correctPassword = user.validPassword(password);
		if (!correctPassword)
			return done(null, false, {message: 'Incorrect password'});

		return done(null, user);
	});
});