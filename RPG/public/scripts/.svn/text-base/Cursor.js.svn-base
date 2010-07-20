var Cursor = function(options) {
	this.border = 5;
	this.width = options.width;
	this.height = options.height
	this._cursor;
	
	this.widthInPx = (options.width * 32) - this.border;
	this.heightInPx = (options.height * 32) - this.border;
}

ActiveEvent.extend(Cursor); 

Cursor.prototype.draw = function () {
	var cursor = $('<div>'),
		inner1 = $('<div>'),
		inner2 = $('<div>'),
		self = this;
	
	cursor.addClass('cursor cursor-tile-outter')
		  .attr('id', 'cursor');
		  
	inner1.addClass('cursor-tile-inner1');
	inner2.addClass('cursor-tile-inner2');
	inner2.css({
		width: self.widthInPx,
		height: self.heightInPx
	});
	
	inner1.append(inner2);
	cursor.append(inner1);
	
	cursor.click(function() {
		self.notify('click');
	})
	
	this._cursor = cursor;
	return cursor;

}
Cursor.prototype.getElement = function() {
	return this._cursor;
}
Cursor.prototype.setEvents = function(selector) {
	
	var self = this;
	
	$(selector).mouseleave(function() {
		self._cursor.hide();
	})

	$(selector).mousemove(function(event) {

		self._cursor.show();
		var parent = $('#map-container').offset(),
			newTop,
			newLeft;
		
		newTop = (Math.ceil((event.pageY - parent.top) / 32) - 1) * 32;
		newLeft = (Math.ceil((event.pageX - parent.left) / 32) -1) * 32;

		self._cursor.css({
			top: newTop,
			left: newLeft
		});
	})

}
Cursor.prototype.setSize = function(width, height) {
	this._cursor.find('div.cursor-tile-inner2')
		.width((width * 32) - this.border)
		.height((height * 32) - this.border);

}
Cursor.prototype.getPosition = function() {
	return {
		x: this._cursor.position().left / 32,
		y: this._cursor.position().top / 32,
	}
}

Cursor.prototype.getSize = function() {
	
	var inner = this._cursor.find('div.cursor-tile-inner2');
	return {
		width: (inner.width() + this.border) / 32,
		height: (inner.height() + this.border) / 32
	}
}
