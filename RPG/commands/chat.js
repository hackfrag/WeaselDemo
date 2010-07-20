

exports.chat = function(server, client, params) {
	


	this.response(server.clients, {
		client: client,
		message: params.message,
	})
	
	
	
}



