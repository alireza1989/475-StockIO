module.exports = {
	userConnected: function(userID, models, socket) {
        socket.join('user' + userID); //Join to hear changes specific to user

        models.User.findById(userID).then((user) => {
            return user.getPortfolios();
        }).then((portfolios) => {
            portfolios.forEach((portfolio) => {
                socket.join('portfolio' + portfolio.id); //Join to hear updates to portfolio
            })
        });		
	},

	userDisconnected: function(userID, models, socket, data) {
		socket.leave('user' + userID);

        models.User.findById(userID).then((user) => {
            return user.getPortfolios();
        }).then((portfolios) => {
            portfolios.forEach((portfolio) => {
                socket.leave('portfolio' + portfolio.id); 
            });
        });	
    }
}