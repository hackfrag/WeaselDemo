var Map = function(options) {
	
	this._map = '';
	this.data = '';
	
	if(options.data) {
		this.data = options.data;
		return;
	}
	
	this.data = {
		tileset: options.tileset,
		properties: [],
		size: {
			width: options.width,
			height: options.height
		},
		tiles: [],
		events: [],
		objects: [],			
	};
	
	

	for(var i = 0; i < options.width; i++) {
		
		this.data.tiles[i] = new Array();
		
		for(var j = 0; j < options.height; j++) {
			
			this.data.tiles[i][j] = new Array();
			
			this.data.tiles[i][j] = {
				passage: true,
				events: [],
				layer: []
			};
			
			for(var z = 0; z < 3; z++) {
				
				this.data.tiles[i][j].layer[z] = new Array();
				
				this.data.tiles[i][j].layer[z] = {
					texture: {
						
				 	}
				};
			}
			
		}
		
	}
}

Map.prototype.getTile = function(params) {
	return this.data.tiles[params.x][params.y];
}
Map.prototype.setTileTexture = function(params) {
	
	var canvas,
		image = new Image();


	if(params.priority == 1) {
		canvas = $("#canvas-"+(params.z+3)).get(0).getContext("2d")
	} else {
		canvas = $("#canvas-"+params.z).get(0).getContext("2d")
	}


	image.src = this.data.tileset;	

	canvas.drawImage(image, Math.abs(params.texture.left), Math.abs(params.texture.top), 32, 32, params.x * 32, params.y * 32, 32, 32);
	this.data.tiles[params.x][params.y].layer[params.z].texture = params.texture;
	this.data.tiles[params.x][params.y].passage = params.passage;

	 
}

Map.prototype.draw = function() {
	var map = $('<div id="map">'),
		container = $('<div id="map-container">'),
		overlay = $('<div id="overlay">'),
		canvas,
		width,
		height;
	
	width = this.data.size.width * 32;
	height = this.data.size.height * 32
	
	for ( var i = 0; i < 6; i++) {
		
		container.append(
			$('<canvas>')
				.attr('id','canvas-'+ i)
				.attr('height',height)
				.attr('width',width)
				.addClass('canvas')
		
		)
	}


	map.width(width);
	map.height(height);
	
	container.width(width);
	container.height(height);
	
	container.append(overlay);
	map.append(container);
	
	/**
	 * save mapDom 
	 */
	this._map = map;
	
	this.redraw();

	return map;	

}
Map.prototype.redraw = function() {
	
	var image = new Image();
	image.src = this.data.tileset;


	for(var i = 0; i < this.data.size.width; i++) {	
		for(var j = 0; j < this.data.size.height; j++) {
			for(var z = 0; z < 3; z++) {
				if(this.data.tiles[i][j].layer[z].texture.left) {				
					canvas = this._map.find('#canvas-'+z).get(0).getContext("2d");
					canvas.drawImage(image, 
						Math.abs(this.data.tiles[i][j].layer[z].texture.left),
						Math.abs(this.data.tiles[i][j].layer[z].texture.top),
						32, 
						32, 
						i * 32, 
						j * 32, 
						32,
						32
					)
				}

			}
			
		}
		
	}		
	
}
Map.prototype.setCursor = function(cursor) {
	cursor.setEvents('#map-container');
	$('#map-container').append(
		cursor.draw()
	)
	
}
Map.prototype.toJSON = function() {
	return JSON.stringify(this.data);	
}




