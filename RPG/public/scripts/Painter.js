var Painter = function(brush) {
	this.brush = brush;
}
ActiveEvent.extend(Painter); 




Painter.prototype.fill = function(textures, map) {
	
	
	for(i = 0; i < map.data.size.width; i++) {	
		for(j = 0; j < map.data.size.height; j++) {
			map.setTileTexture({
				x: i,
				y: j,
				z: Editor.layer,
				texture: textures[0],
				passage: textures[0].passage
			})
			
		}
	}

	

}

Painter.prototype.pencil = function(textures, cursor,  map) {
	
	var position = cursor.getPosition(),
		cursorSize = cursor.getSize(),
		tile,
		widthCount = 0,
		heightCount = 0

	
	if(textures.length == 1) {
	
		map.setTileTexture({
			x: position.x,
			y: position.y,
			z: Editor.layer,
			texture: textures[0],
			passage: textures[0].passage
		})
		
	} else {
		
		
		$(textures).each(function(i, item) {
		
			if(cursorSize.height > heightCount) {


				map.setTileTexture({
					x: (position.x + widthCount),
					y: (position.y + heightCount),
					z: Editor.layer,
					texture: item,
					passage: textures.passage
				})
				
				heightCount+=1;
				
			} else {

				heightCount=0;
				widthCount+=1;
			
				
				map.setTileTexture({
					x: (position.x + widthCount),
					y: (position.y + heightCount),
					z: Editor.layer,
					texture: item,
					passage: textures.passage
				})
				
				heightCount+=1;
			
			}
		})
	
	}
}