userSocketDictionary = {};

module.exports = {
	userConnected: function(userID, models, socket) {
        socket.join('user' + userID); //Join to hear changes specific to user
        userSocketDictionary[userID] = socket;

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
    },

    newPortfolio: function(memberID, portfolioID) {
        var memberSocket = userSocketDictionary[memberID];
        if (memberSocket !== undefined) {
            memberSocket.join('portfolio' + portfolioID);
        }
    }
}