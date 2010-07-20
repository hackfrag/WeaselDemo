var Commands = {	
	move: function(params){

		Game.getPlayable()._isMoving = false;
		Game.getPlayer(params.positions.id).moveTo({
			x: params.positions.x,
			y: params.positions.y		
		});
	},
	chat: function(params) {
		Game.getPlayer(params.client.sessionId).chat({
			message: params.message
		});
	},
	newClient: function(params) {
		
		var player = new Character(params.client.sessionId, params.client.skin,'',params.client.name);
		Game.addPlayer(player);
		player.spawnAt({
			x: params.client.x,
			y: params.client.y
		});
		
	},
	goto: function(params) {
		
		
		Game.getPlayer(params.sessionId).moveTo({
			x: params.x,
			y: params.y
		});
		
	},
	disconnect: function(params) {
	
		
		var player = Game.getPlayer(params.client.sessionId)
		if(player) {
			player.kill();
		}
	},
	admin_setnight: function(params) {
		$('#night').fadeIn(2000)
	},
	admin_setday: function(params) {
		$('#night').fadeOut(2000)
	} 
}

Weasel.subscribe('move', Commands.move);
Weasel.subscribe('chat', Commands.chat);
Weasel.subscribe('connect', Commands.newClient)
Weasel.subscribe('disconnect', Commands.disconnect);
Weasel.subscribe('admin_setnight', Commands.admin_setnight);
Weasel.subscribe('admin_setday', Commands.admin_setday);
Weasel.subscribe('goto', Commands.goto);
