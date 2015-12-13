# Snaplog

This small tool allow you to enhance your logs in console. Use differents levels of log, create a progress bar, deeply inspect your objects and enhance your errors.


[![NPM](https://nodei.co/npm/snaplog.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/snaplog/)

![ng-flat-datepicker screenshot](http://i.imgur.com/8aY10Cs.png)

**(Working progress) - only tested on nodejs 5.0 with ES6. I plan to convert in ES5 with Babel and so support older version of nodejs.**
*Please, feel free to contribute.*

**Todo :**
 - support ES5 with Babel
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
logger.warn('Houston do you copy ??');
logger.error('Houston we have a problem !');
logger.emergency('Mayday Mayday Mayday !');
logger.inspect({we: {find: {the: {black: [{box: '!!!!'}]}}}});

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
**.config(options)** - *This method allows you to set up the logger*
 - (String) Object

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
}
```

 * **.success(message)** - *print success log in terminal with colors*
 *  **.info(message)** - *print info log in terminal with colors*
 *  **.warn(message)** - *print warn log in terminal with colors*
 *  **.error(message)** - *print error log in terminal with colors*
 *  **.emergency(message)** - *print emergency log in terminal with colors*

 * (String) message

```js
logger.success('We did it !');
logger.info('Roger that !');
logger.warn('Houston do you copy ??');
logger.error('Houston we have a problem !');
logger.emergency('Mayday Mayday Mayday !');
```

**.inspect(object, depth)** - *Deep inspection of an object*

 - (String) message
 - (Number) depth

```js
logger.inspect({ we: { find: { the: { black: [ { box: '!!!!'}]}}}});
```

### Progress bar
**.progress(options)** - *Instanciate a new progress bar*

 - (Number) options.steps *[required - set the total steps for the progression]*
 - (String) options.title *[optional - set the log's title]*
```js
var progress = logger.progress({title: 'From Paris to New York', steps: 4});
```

**progress.next(options)** - *Push the next step*
 - (String) options.description *[optional - description of the step - default:1]*
 - (String) options.steps *[optional - number of steps to push - default:'']*

```js
progress.next({description: 'Roger that !'});
```

#### License: MIT
#### Author: [Alexandre Da Costa](https://github.com/AlexandreAWE)
