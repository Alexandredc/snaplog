# Snaplog

This small tool allow you to enhance your logs in console. Use differents levels of log, create a progress bar, deeply inspect your objects and enhance your errors.

![ng-flat-datepicker screenshot](http://i.imgur.com/qA0DdT9.png)

**(Working progress)**
**Todo :**
 - deeply inspection
 - enhance errors
 - build script (ES5)
 - unit tests

## Install
```shell
$ npm install snaplog --save
```

## Usage

```js
// Basic usage
var logger = require('snaplog');

// Set options to the logger
logger.config({}) // optional

// Log in console with differents levels
logger.success('We did it !');
logger.info('Roger that !');
logger.warn('Houston we have a problem !');
logger.alert('Mayday Mayday Mayday !');

// Create a progressbar
var progress = logger.progress({title: 'From Paris to New York', steps: 4});

setTimeout(nextCall, 1000, 'Roger that !');
setTimeout(nextCall, 3000, 'Houston we have a problem !');
setTimeout(nextCall, 5000, 'Mayday Mayday Mayday !');
setTimeout(nextCall, 7000, 'We did it !');

function nextCall(message) {
	progress.next({description: message});
}

```

## Methods
**.config(options)**
*this method allows you to set up the logger*
(Object) options
```js
logger.config({
	enabled: true, // toggle the logger
	time: {
		enabled: true, // toggle time display
		format: 'YYYY-MM-DD HH:mm:ss' // set time format
	},
	levels: { // levels settings
		success: {enabled: true, color: 'green'},
		info: {enabled: true, color: 'blue'},
		warn: {enabled: true, color: 'yellow'},
		error: {enabled: true, color: 'red'}
	}
})
```

**.success(message)**
**.info(message)**
**.warn(message)**
**.error(message)**
*these methods allow you to print log in terminal with colors*
(String) message
```js
logger.success('We did it !');
logger.info('Roger that !');
logger.warn('Houston we have a problem !');
logger.alert('Mayday Mayday Mayday !');
```

### Progress bar
**.progress(options)**
*instanciate a new progress bar*
(Number) options.steps *[required - set the total steps for the progression]*
(String) options.title *[optional - set the log's title]*
```js
var progress = logger.progress({title: 'From Paris to New York', steps: 4});
```

**progress.next(options)**
*push the next step*
(String) options.description *[optional - description of the step - default:1]*
(String) options.steps *[optional - number of steps to push - default:'']*

```js
progress.next({description: 'Roger that !'});
```
