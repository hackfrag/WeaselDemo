var sys = require('sys'),
	fs	= require('fs');

Controller('Map', {
	
	load : function(server, client, params) {
	
		var self = this;
		
	
		
		fs.readFile(server.APPLICATION_ROOT + '/data/maps/map.json', 'utf8', function (err, data) {
			
			try {
				self.response([client], {
					map: JSON.parse(data)
				})
			} catch(e) {
				console.log(e)
			}
			
		});
	}
	
})
