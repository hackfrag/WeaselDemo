var Game =  {
	current : '',
	_player: [],
	
	map: '',
	init: function() {
	
		var self = this;
		
		$(document).keypress(function(e) {	
			
			
			if(self.current && self.current._isPlaying === false) {
				var params;
				
				if(Game.getPlayable()._isMoving == false) {
					
					var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
					switch(key) {
						case 38:
							
							
							Game.getPlayable().move({
								direction: 'top'
							});
							break;
						case 40:
						
							Game.getPlayable().move({
								direction: 'bottom'
							});
							break;
						case 37:
						
							Game.getPlayable().move({
								direction: 'left'
							});
							break;
						case 39:
							
							Game.getPlayable().move({
								direction: 'right'
							});
							break;
							
					}
				}
			}
						
		});	
	},
	addPlayer : function(player) {
		this._player.push(player);
		$('#map-container').append(
			player._player
		)
		
		
		jQuery.data($('#player-'+player.id).get(0), "index", this._player.length-1);
	},
	getPlayer : function(id) {
		
		if($('#map-container').find('#player-'+id).length == 1) {
			var index = jQuery.data($('#player-'+id).get(0), "index");
		
			return this._player[index];
		} else {
			throw('Could not find character with id '+id);
		}
	},
	deletePlayer : function(id) {
		if($('#map-container').find('#player-'+id).length == 1) {
			var index = jQuery.data($('#player-'+id).get(0), "index");
	
			this._player.slice(index);
		} else {
			throw('Could not find character with id '+id);
		}	
	},
	loadMap : function(json) {
		
		
		var map = new Map({
			data: json
		});
		
		
		this.map = map;
		$('#game').empty();
		
		
		$('#game').append(
			map.draw()
		);
		
	},
	setPlayable : function(player) {
		this.current = player;
	},
	getPlayable : function() {
		return this.current;
	}, 
	destroy : function() {
		
		$(document).unbind('keypress');
	}


}


