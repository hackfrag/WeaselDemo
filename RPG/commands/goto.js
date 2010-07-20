

exports.goto = function(server, client, params) {
	
	client.x = params.x;
	client.y = params.y;
	

	this.response(server.clients, {
		x: params.x,
		y: params.y,
		sessionId: client.sessionId
	})
	
	
	
}



