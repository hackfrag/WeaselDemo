var weasel = require('../weasel/lib/weasel.server'),
	sys = require('sys');
	


var Example = new weasel.Server().listen(8080);



Example.addListener("onClientConnect", function(client) {
	client.x = 1;
	client.y = 1;
	client.skin = "knight";
	client.name ="test-" + client.sessionId;

})
