

/* * * * * * * * * * * * * * *
 * 
 * 	Multiple Canvas Rainbow Effect Generator
 * 
 * * * * * * * * * * * * * * */
 
var scene = {
	
	// Controller Elements
	elements : { 
				MainControls: { 
						size: { range: { min: 1, max: 21 }}, 
						phase: { range: { min: 1, max: 101 }}
				}, 
				 PhaseControls: { 
					 red: {range: { min: 1, max: 101 }}, 
					 green: {range: { min: 1, max: 101 }}, 
					 blue: {range: { min: 1, max: 101 }}
				},
				 FreqControls: { 
					'red-frequency': {range: { min: 1, max: 101 }}, 
					'green-frequency': {range: { min: 1, max: 101 }}, 
					'blue-frequency': {range: { min: 1, max: 101 }}
				}
			},

	// Canvas ID Name
	canvas : 'scene',
	settings : {},
	
	// Build canvas and append to stage
	init: function() {	    
		    
		// Add Controls element to own stage with unique id
		var wrapper = new Element('section#wrapper').inject($('holder'));
		var controls = new Element('div#controls').inject(wrapper);
		var i = 0;
		
		// loop through main controls and apppend each child to stage
		Object.each(scene.elements, function(v, k) {		
			// create sub-control element
			var subC = new Element('div', { 'class': 'sub-control', html: '<h2>' + k + '</h2>' });
			$('controls').adopt(subC);
			
			// Adopt All sub-control sub elements
		    Object.each(v, function(v, k) {
				var el = new Element('div', { id: k, 'class': 'slider', html: '<div class="knob"></div><span>' + k + '</span><div class="text"></div>' });
				$$('.sub-control')[i].adopt(el);
			});
			++i;
		});    
		    
		// New Canvas
		var canvas = new Element('canvas', {
			id: scene.canvas,
			styles: {
				height: '100%',
				width: '100%',
				position: 'absolute',
				top: '0px',
				left: '0px',
				zIndex: '-1'
			}
		}).inject($('wrapper'));
		
		
		// Build new sliders for each element
		Object.each(scene.elements, function(v, k) {
			Object.each(v, function(v, k) {
				var a = $(k);
				new Slider(k, a.getElement('.knob'), {
					range: [v.range.min, v.range.max],
					wheel: true,
					onChange: function() {
						scene.settings[k] = this.step;
						a.getElement('.text').set('html', (this.step));
						scene.loadScene();
					}
				});
			});
		});	
	},
	
	// Load a sky into the document with certain variables
	loadScene: function() {
		
		var context = $(scene.canvas).getContext("2d");
		var size = $(scene.canvas).getSize();
		var amount = size.y / scene.settings.size;
		scene.settings.centre = 128;
		
		for(var i = 0; i < amount;) {
			
			red   = Math.sin((scene.settings['red-frequency'] / 100) * i + (scene.settings.red / 10) + (scene.settings.phase / 10)) * 127 + scene.settings.centre;
			green = Math.sin((scene.settings['green-frequency'] / 100) * i + (scene.settings.green / 10)  + (scene.settings.phase / 10)) * 127 + scene.settings.centre;
			blue  = Math.sin((scene.settings['blue-frequency'] / 100)  * i + (scene.settings.blue / 10)  + (scene.settings.phase / 10)) * 127 + scene.settings.centre;
			context.fillStyle = scene.RGB2Color(red, green, blue);
			context.fillRect (0, i * scene.settings.size, size.x, scene.settings.size);
			++i;
		}
	},
	
	
	// Mootools functions for this aren't very good for some reason, so these are custom
	RGB2Color: function(r,g,b)
	{
		return '#' + scene.byte2Hex(r) + scene.byte2Hex(g) + scene.byte2Hex(b);
	},
	
	byte2Hex: function(n)
	{
		var nybHexString = "0123456789ABCDEF";
		return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
	}
	
}




