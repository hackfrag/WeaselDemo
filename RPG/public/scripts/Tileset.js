
Tileset = ActiveRecord.define('tilesets',{ 
	name: '', 
  	image: '',
  	width: '',
  	height: '',
	data: '',
  		 
},{  
	setData: function(x, y, key, value) {
		var data = JSON.parse(this.data);

		data[x][y][key] = value;
		
		this.set('data', JSON.stringify(data));
		this.save();
	},
	getData: function(x, y, key) {
		var data = JSON.parse(this.data);

		return data[x][y][key];
	},

	draw: function() {
		var container = $('<div>'),
			image = $('<img>'),
			self = this,
			width = (this.width / 32),
			height = (this.height / 32),
			data = JSON.parse(this.data);
		
		
		container.addClass('tileset');
		
		image.attr('src', this.image);
		image.appendTo(container);
		
		
		for(i = 0; i < width; i++) {
			
			for(j = 0; j < height; j++) {
				
				var tile = $('<div>').css({
					top: j*32,
					left: i*32
				});
				
				tile.attr('id','tile-'+ i +'-'+ j);
				tile.addClass('tile');
				tile.css({
					'background-position':'0px 0px'
				});
				
				
				tile.click(function() {
					
					$('div.tileset').find('div.tile').removeClass('ui-selected');
					$(this).addClass('ui-selected');
			
					var x = $(this).position().left / 32,
						y = $(this).position().top / 32;
					
					Tileset.selected = [{
						left: $(this).position().left,
						top: $(this).position().top,
						'x': x,
						'y': y,
						passage: self.getData(x,y, 'passage')
					}];
					
					
					self.notify('afterTileSelected', Tileset.selected, {width: 1, height: 1});
						
				})
				/**
				 * Passage
				 */
				var passage = $('<div>');
				passage
					.addClass('passage')
				
				if(data[i][j].passage == false) {
					passage.addClass('block')
				} 
				
				tile.append(passage);
					
				container.append(tile);
			}
			
		}
		
		if(Tileset.selectable) {
			container.selectable({
				filter: 'div.tile',
				delay:40,
				start: function(event, ui) {
					Tileset.selected = [];
				},
				selected: function(event, ui) {
					
					var x = $(ui.selected).position().left / 32,
						y = $(ui.selected).position().top / 32;
					
					Tileset.selected.push({
						left: $(ui.selected).position().left,
						top: $(ui.selected).position().top,
						'x': x,
						'y': y,
						passage: self.getData(x,y, 'passage')
					});	
			
				}, 
				stop: function() {
				
					self.notify('afterTilesSelected', Tileset.selected, Tileset.getSelectedSize());
					
		
				}
		
			});			
		}
		self.notify('afterDraw', container);
		return container;
	}
});
Tileset.add = function() {
	var defaultDir = air.File.documentsDirectory,
		stream,
		currentFile;
	 
	 defaultDir.browseForOpen("Open");
	 defaultDir.addEventListener(air.Event.SELECT, function(event) {
	 	original = new air.FileStream();
	 	original.open(event.target, air.FileMode.READ);
		
		var str = original.readMultiByte(original.bytesAvailable);
	
	 	var newFile = air.File.applicationStorageDirectory.resolvePath("Tilesets/"+ event.target.name); 

	 	var dest = new air.FileStream();
	 	dest.open(newFile, air.FileMode.WRITE);
	 	
	 	dest.writeBytes(str);
		dest.close();
	 	
	 	var tileset = Tileset.create({
	 		image: newFile.nativePath,
	 		name: newFile.name,
	 		width: 256,
	 		height: 608
	 	})
	 	
	 	
	 });
	 
}
Tileset.getSelectedSize = function() {
	var oldTop = -1 ,
		oldLeft = -1,
		newWidth = 0,
		newHeight = 0;

	$(Tileset.selected).each(function(i, item) {
							
		if(oldLeft == item.left || i == 0) {
			oldLeft = item.left;
			newHeight+=1;
		}
		if(oldTop == item.top || i == 0) {
			oldTop = item.top;
			newWidth+=1;
		}

		
	});

	return {
		height: newHeight,
		width: newWidth
	};

}
Tileset.selectable = true;
Tileset.selected = [];


/**
 * Observers
 */
Tileset.observe('afterCreate',function(tileset){  
	var width,
		height,
		data = [];
	
	width = (tileset.width / 32),
	height = (tileset.height / 32);
	
	for(i = 0; i < width; i++) {
		data[i] = new Array();
		for(j = 0; j < height; j++) {
			data[i][j] = new Array();
			data[i][j] = {
				passage: true,
				priority: 0
			};
		}
	}
	
	tileset.set('data', JSON.stringify(data));
	tileset.save();
	
});   