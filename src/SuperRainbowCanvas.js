var SuperRainbowCanvas = new Class
({
    Implements: [Options, Events],
    
    options: 
    {
    	container: '',
    	settings: {},
		mainControls: 
		{ 
			size: { range: { min: 1, max: 21 }}, 
			phase: { range: { min: 1, max: 101 }}
		}, 
		phaseControls: 
		{ 
			red: {range: { min: 1, max: 101 }}, 
			green: {range: { min: 1, max: 101 }}, 
			blue: {range: { min: 1, max: 101 }}
		},
		freqControls: 
		{ 
			'red-frequency': {range: { min: 1, max: 101 }}, 
			'green-frequency': {range: { min: 1, max: 101 }}, 
			'blue-frequency': {range: { min: 1, max: 101 }}
		}
    },

    canvas: {},

	initialize: function(options)
	{
        this.setOptions(options);
        console.log(this.options);
        this.buildCanvas(this.options.container);
    },

    buildCanvas: function(container)
    {
		if(!container)
			container = document.body;

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
    }
});