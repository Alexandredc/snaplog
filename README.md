# Snaplog

This small tool allow you to enhance your log in console. Use differents levels of log. Deeply inspect your objects

**(Working progress)**

## Install
```shell
$ npm install snaplog --save
```

## Usage

```js
// Basic usage
var logger = require('snaplog');

// Set options to the logger
logger.config(options)

// Log in console with differents levels
logger.success('We did it !');
logger.info('Roger that !');
logger.warn('Houston we have a problem !');
logger.alert('Mayday Mayday Mayday !');
```

## API
**Config options**
```js
logger.config({
	time: {
		enabled: true,
		format: 'YYYY-MM-DD HH:mm:ss'
	},
	colors:{ // we use chalk for colorize output
		success: 'bgGreen',
		info: 'bgBlue',
		warn: 'bgYellow',
		error: 'bgRed',
	}
})
```
