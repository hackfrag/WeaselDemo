var Character = function(id, skin) {
	
	
	this._isMoving = false;
	this._isPlaying = false;
	this._position = {};
	this.id = id;
	
	
	var player = $('<div>'),
		bubble = $('<div>');

	player.addClass('character '+skin);
	player.attr('id', 'player-'+id);

	bubble.addClass('bubble');
	bubble.hide();
	bubble.append(
		$('<blockquote><p></p></blockquote><cite>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</cite>')
	);
	
	
	var playerObject = $('<div>');
	playerObject.addClass('special')
	playerObject.hide();	
	
	player.append(playerObject);
	
	player.append(bubble);
	player.hide();
	
	this._player = player;
	

}
Character.prototype.spawnAt = function(options) {
	
	this._player.css({
		left: options.x * 32,
		top: options.y * 32
		
	});
	this._position = {
		'x' : options.x,
		'y' : options.y
	};
	var self = this;
	this._player.fadeIn(500, function() {
		self.special({
			types: ['spawn1', 'spawn2','spawn3'],
			duration: 200
		});
	});
	
}
Character.prototype.moveTo = function(options) {
	
	var self = this;
	

	options.id = this.id;
	
	
	if(!options.speedNum) {
		options.speedNum = 400;
	}
	if(!options.stepCount) {
		options.stepCount = 1;
	}
	
	var stepLength = 32 * options.stepCount;

	if(this._position.y > options.y) {
		this.watch({
			'direction' : 'top',
		});
	} else if(this._position.y < options.y) {
		this.watch({
			'direction' : 'bottom',
		});
	} else if(this._position.x > options.x) {
		this.watch({
			'direction' : 'left',
		});
	} else if(this._position.x < options.x) {
		this.watch({
			'direction' : 'right',
		});
	}
	
	options.stepCount = Math.abs(this._position.x - options.x) + Math.abs(this._position.y - options.y);

	this._position = {
		x: options.x,
		y: options.y
	};
	;
	
	var count = 0;
	
	this._player.animate({
		left: options.x * 32,
		top : options.y * 32
	},{
		step: function(now, item ) {
			
			count+=1;
			self._isMoving = true;
			if(!(count%16)) {
				if($(item.elem).hasClass('move1')) {
					$(item.elem).removeClass('move1');
					$(item.elem).addClass('move2');
				} else {
					$(item.elem).removeClass('move2');
					$(item.elem).addClass('move1');
				}
				
			}
			
			
		},
		duration: options.speedNum * options.stepCount,
		easing:'linear',
		complete: function() {
			self._isMoving = false;
			$(this).removeClass('move1 move2');
	
			
		}
	});
}
Character.prototype.move = function(options) {

	switch(options.direction) {
		case 'left':
			this.moveTo({
				x: this._position.x-1, 
				y: this._position.y
			});
			break;
		case 'right':
		
			this.moveTo({
				x: this._position.x+1,
				y: this._position.y
			});
			break;
		case 'top':
			
			this.moveTo({
				x: this._position.x,
				y: this._position.y-1
			});
			break;
		case 'bottom':
		
			this.moveTo({
				x: this._position.x, 
				y: this._position.y+1
			});
			break;
	}
	
}

Character.prototype.watch = function(options) {
	this._player.removeClass('left right bottom top');				
	this._player.addClass(options.direction);		
}
Character.prototype.chat = function(options) {
	var bubble = this._player.find('div.bubble'),
		special = this._player.find('div.special'),
		textbox = this._player.find('p');
	
	bubble.stop(true).hide();
	special.stop(true).hide();
	
	
	switch(options.message) {
		case '/?':
			this.special({
				types: ['question'],
				duration: 400
			});
			break;
		case '/sleep':
			this.special({
				types: ['sleep1', 'sleep2','sleep3','sleep4'],
				duration: 600
			});
			break;
		default:
			bubble.show();
			textbox.html(options.message);
			bubble.width(textbox.width()+15);
		
			bubble.stop(true).hide();				
			bubble.fadeIn(200, function() {
				
				
				$(this).fadeTo(3000,1, function() {
					
				});
				$(this).fadeOut(1000)
				
				
			});	
	}
	

},

Character.prototype.special = function(params) {
	var special = this._player.find('div.special'),
		bubble = this._player.find('div.bubble'),
		currentClass;
	

	special.removeClass();
	special.addClass('special '+params.types[0]);
	currentClass = params.types[0];

	special.fadeIn(200, function() {
		if(params.types.length > 1) {
			
			
			$(params.types).each(function(i, item) {
				if(i != 0 && i != (params.types.length - 1)) {
					window.setTimeout(function() {
						special.removeClass();
						special.addClass('special '+item);
					}, params.duration * i);
				} else if(i == (params.types.length - 1)) {
					window.setTimeout(function() {
						special.removeClass();
						special.addClass('special '+item);
						special.fadeOut(1000)	
					}, params.duration * i);
				}
			
			})	
		
		} else {
			special.fadeTo(1000,1);
			$(this).fadeOut(1000);
		}
	})
	
	
}
/*
Character.prototype.exec = function(fn, params) {
	
	this._isPlaying = true;
	var args = Array.prototype.slice.call(arguments); 
	args.shift();
	this._queue.push({
		'fn' : fn,
		'params' : args
	});
},
Character.prototype._callNextInQueue = function() {
	
	if(this._queue.length == 0) {
		this._isPlaying = false;
		return;		
	}
	var object = this._queue[0];
	if(object) {
		this._queue.shift();
		
		this[object.fn].apply(this,object.params);
		
		
	}
}
*/
Character.prototype.kill = function() {
	
	var self = this;

	this.special({
		types: ['cloud1', 'cloud2','cloud3'],
		duration: 300
	})
	
	this._player.fadeTo(900,1);
	this._player.fadeOut(1200, function(){
		Game.deletePlayer(self.id);
		self._player.remove();
	});
	
	
}

