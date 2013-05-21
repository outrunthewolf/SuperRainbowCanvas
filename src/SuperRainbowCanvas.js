var SuperRainbowCanvas = new Class
({
    Implements: [Options, Events],
    
    options: 
    {
    	container: '',
    	settings: {},
		size: 
		{
    		min: 1,
    		max: 101
		},
		styles:
		{
			box: 
			{
				'float': 'left',
				background: '#333'
			},
			subControl: 
			{
				background: '#dedede',
				padding: '10px'
			},
			slider: 
			{
				background: '#333',
				width: '200px',
				margin: '2px',
				padding: '2px;'
			},
			knob: 
			{
				width: '20px',
				height: '20px',
				background: '#ff9600',
				cursor: 'pointer'
			}
		}
    },

    canvas: {},
    controls: {},

	initialize: function(options)
	{
        this.setOptions(options);

		if(!this.options.container)
			this.options.container = document.body;

        this.setControlRange(this.options);
        this.buildCanvas(this.options.container);
        this.buildControls(this.options);

        
    },

    buildCanvas: function(container)
    {
		this.canvas = new Element('canvas', {
			id: 'SuperRainbowCanvas',
			styles: {
				height: '100%',
				width: '100%',
				position: 'absolute',
				top: '0px',
				left: '0px',
				zIndex: '-1'
			}
		}).inject(container);
    },

    setControlRange: function(controls)
    {
    	this.controls = 
    	{
	    	mainControls: 
			{ 
				size: { range: { min: controls.size.min, max: 21 }}, 
				phase: { range: { min: controls.size.min, max: controls.size.max }}
			}, 
			phaseControls: 
			{ 
				red: {range: { min: controls.size.min, max: controls.size.max }}, 
				green: {range: { min: controls.size.min, max: controls.size.max }}, 
				blue: {range: { min: controls.size.min, max: controls.size.max }}
			},
			freqControls: 
			{ 
				'red-frequency': {range: { min: controls.size.min, max: controls.size.max }}, 
				'green-frequency': {range: { min: controls.size.min, max: controls.size.max }}, 
				'blue-frequency': {range: { min: controls.size.min, max: controls.size.max }}
			}
		}
    },

    buildControls: function(options)
    {
		var self = this;
		var wrapper = new Element('section#wrapper').inject(options.container);
		var control = new Element('div#control', { styles: options.styles.box }).inject(wrapper);
		var i = 0;
		

    	// loop through main controls and apppend each child to stage
		Object.each(this.controls, function(v, k) 
		{		
			// create sub-control element
			var subC = new Element('div', 
			{ 
				'class': 'sub-control', 
				html: '<h2 style="margin: 0px 0px 10px 0px">' + k.capitalize() + '</h2>',
				styles: options.styles.subControl
			});
			$('control').adopt(subC);
			
			// Adopt All sub-control sub elements
		    Object.each(v, function(v, k) {
				var el = new Element('div', 
				{ 
					id: k, 
					'class': 'slider', 
					html: '<div class="knob"></div><span style="color: #fff">' + k + '</span><div class="text" style="color: #fff;"></div>', 
					styles: options.styles.slider
				});
				$$('.sub-control')[i].adopt(el);
			});
			$$('.knob').setStyles(options.styles.knob);
			++i;
		});

		// Build new sliders for each element
		Object.each(this.controls, function(v, k) {
			Object.each(v, function(v, k) {
				var a = $(k);
				new Slider(k, a.getElement('.knob'), {
					range: [v.range.min, v.range.max],
					wheel: true,
					onChange: function() {
						options.settings[k] = this.step;
						a.getElement('.text').set('html', (this.step));
						self.loadScene();
					}
				});
			});
		});	
    },

	loadScene: function() 
	{
		var context = this.canvas.getContext("2d");
		var size = this.canvas.getSize();
		var amount = size.y / this.options.settings.size;
		this.options.settings.centre = 128;
		
		for(var i = 0; i < amount;) {
			
			red   = Math.sin((this.options.settings['red-frequency'] / 100) * i + (this.options.settings.red / 10) + (this.options.settings.phase / 10)) * 127 + this.options.settings.centre;
			green = Math.sin((this.options.settings['green-frequency'] / 100) * i + (this.options.settings.green / 10)  + (this.options.settings.phase / 10)) * 127 + this.options.settings.centre;
			blue  = Math.sin((this.options.settings['blue-frequency'] / 100)  * i + (this.options.settings.blue / 10)  + (this.options.settings.phase / 10)) * 127 + this.options.settings.centre;
			context.fillStyle = this.RGB2Color(red, green, blue);
			context.fillRect (0, i * this.options.settings.size, size.x, this.options.settings.size);
			++i;
		}
	},

	// Mootools functions for this aren't very good for some reason, so these are custom
	RGB2Color: function(r,g,b)
	{
		return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
	},
	
	byte2Hex: function(n)
	{
		var nybHexString = "0123456789ABCDEF";
		return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
	}

});