var SuperRainbowCanvas = new Class
({
    Implements: [Options, Events],
    
    options: 
    {
    	container: '',
    	settings: {},
    	controlSize: {
    		min: 1,
    		max: 101
    	}
    },

    canvas: {},
    controls: {},

	initialize: function(options)
	{
        this.setOptions(options);

		if(!this.options.container)
			this.options.container = document.body;

        this.setControlRange(this.options.controlSize);
        this.buildCanvas(this.options.container);
        this.buildControls(this.options);
    },

    buildCanvas: function(container)
    {
		canvas = new Element('canvas', {
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

    setControlRange: function(controlSize)
    {
    	this.controls = 
    	{
	    	mainControls: 
			{ 
				size: { range: { min: controlSize.min, max: controlSize.max }}, 
				phase: { range: { min: controlSize.min, max: controlSize.max }}
			}, 
			phaseControls: 
			{ 
				red: {range: { min: controlSize.min, max: controlSize.max }}, 
				green: {range: { min: controlSize.min, max: controlSize.max }}, 
				blue: {range: { min: controlSize.min, max: controlSize.max }}
			},
			freqControls: 
			{ 
				'red-frequency': {range: { min: controlSize.min, max: controlSize.max }}, 
				'green-frequency': {range: { min: controlSize.min, max: controlSize.max }}, 
				'blue-frequency': {range: { min: controlSize.min, max: controlSize.max }}
			}
		}
    },

    buildControls: function(options)
    {

		var wrapper = new Element('section#wrapper').inject(options.container);
		var control = new Element('div#control').inject(wrapper);
		var i = 0;

    	// loop through main controls and apppend each child to stage
		Object.each(this.controls, function(v, k) 
		{		
			// create sub-control element
			var subC = new Element('div', { 'class': 'sub-control', html: '<h2>' + k + '</h2>' });
			$('control').adopt(subC);
			
			// Adopt All sub-control sub elements
		    Object.each(v, function(v, k) {
				var el = new Element('div', { id: k, 'class': 'slider', html: '<div class="knob"></div><span>' + k + '</span><div class="text"></div>' });
				$$('.sub-control')[i].adopt(el);
			});
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
						//scene.loadScene();
					}
				});
			});
		});	   

    }

});