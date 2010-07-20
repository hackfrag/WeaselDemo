var fs		= require('fs'),
	sys		= require('sys');


exports.loadMap = function(server, client, params) {
	
	var self = this;
	
	fs.readFile('./maps/map.json', 'utf8', function (err, data) {
		
		try {
			self.response([client], {
				map: JSON.parse(data)
			})
		} catch(e) {
			console.log(e)
		}
		
	});
	
	
}



