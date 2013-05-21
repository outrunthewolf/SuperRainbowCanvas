## About
Super Rainbow Canvas makes ridiculous gradient / rainbow patterns in canvas using sine waves and the Moo-Tools library.

## Requires
- Moo-Tools Core 1.5.4
- Moo-Tools More Slider 1.4.0

## Usage
Include the script as normal
```html
    <script type="text/javascript" src="../src/SuperRainbowCanvas.js"></script>
```

To initiate the script
```javascript
	window.addEvent('domready', function()
	{
		new SuperRainbowCanvas();
	});
```

Basic options are as follows
```javascript
    options: 
    {
    	container: '', // You can force the canvas to be contained within a particular element
		size: 
		{
    		min: 1, // Min and Max slider sizes
    		max: 101
		},
		styles: // Override styles for the various elements
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
    }
```
