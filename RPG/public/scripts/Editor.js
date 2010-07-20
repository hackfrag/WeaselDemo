var Editor = {
	
	current : {
		top: 0,
		left:0
	},
	level: 1,
	init: function() {
		var chipset = $('#chipset'),
			width,
			height;
		
		width = chipset.width() / 32;
		height = chipset.height() / 32;
		
		for(i = 0; i < height; i++) {
		
			for(j = 0; j < width; j++) {
			
				var box = $('<div>').css({
					top: i*32,
					left: j*32
				});
				box.attr('id','box-'+ j +'-'+ i);
				box.addClass('box');
				box.css({
					'background-position':'0px 0px'
				});
				box.click(function() {
					$('#chipset').find('div.box').removeClass('active');
					$(this).addClass('active');
					
					Editor.current = $(this).position();
				})
				
				chipset.append(box);
			}
			
		}
				
		$('#savemap').click(function() {	
			var mapData = new Array();
			var i=0;
			var j=0;
			var myField = "";
			for(i = 0; i < height; i++) {
				mapData[i] = new Array();
				for(j = 0; j < width; j++) {
					var myField = $('#field-'+ j +'-'+ i).css('background-position');
					if(myField) {
						myField = myField.replace(/px/g,"");
						mapData[i][j] = myField
					}
				}
			}
			Weasel.command('savemap',{map:mapData},function(params) {
				alert("Map Saved");
			})	
		});
		
		$('#loadmap').click(function() {	
			Weasel.command('loadmap',function(params) {
				for (var key1 in params) {
					for (var key2 in params[key1]) {
    					$('#field-'+ key2 +'-'+ key1).css({'background-position' : params[key1][key2]});
					}
				}
			})	
		});		
		
		
		
		$('div.field').click(function() {
			
			var field;
			
			if(Editor.level == 1){
				field = $(this)
			} else if(Editor.level ==2) {
				field = $(this).find('div.level2')
				
			} else if(Editor.level == 3) {
				field = $(this).find('div.level3')
			}
			
			field.css({
				'background-position' : '-'+Editor.current.left+'px -'+Editor.current.top+'px'
			})
		})
		
		$('#level').change(function() {
			Editor.level = $(this).val();
		})
		
		
	}
}