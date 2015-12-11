# Snaplog

This small tool allow you to enhance your logs in console. Use differents levels of log, create a progress bar, deeply inspect your objects and enhance your errors.

![ng-flat-datepicker screenshot](http://i.imgur.com/243FKuz.png)

**(Working progress)**
**Todo :**
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
<br/>
// Log in console with differents levels
logger.success('We did it !');
logger.info('Roger that !');
logger.warn('Houston we have a problem !');
logger.alert('Mayday Mayday Mayday !');
<br/>
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
<br/>
## Methods
**.config(options)**<br/>
*this method allows you to set up the logger*<br/>
(Object) options<br/>
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
<br/>
**.success(message)**<br/>
**.info(message)**<br/>
**.warn(message)**<br/>
**.error(message)**<br/>
**.emergency(message)**<br/>
*these methods allow you to print log in terminal with colors*<br/>
(String) message<br/>
```js
logger.success('We did it !');
logger.info('Roger that !');
logger.warn('Houston we have a problem !');
logger.alert('Mayday Mayday Mayday !');
```
<br/>
**.inspect(object, depth)**<br/>
*deep inspection of an object*<br/>
(String) message<br/>
(Number) depth<br/>
```js
logger.inspect({ we: { find: { the: { black: [ { box: '!!!!'}]}}}});
```
<br/>
### Progress bar
**.progress(options)**<br/>
*instanciate a new progress bar*<br/>
(Number) options.steps *[required - set the total steps for the progression]*<br/>
(String) options.title *[optional - set the log's title]*<br/>
```js
var progress = logger.progress({title: 'From Paris to New York', steps: 4});
```
<br/>
**progress.next(options)**<br/>
*push the next step*<br/>
(String) options.description *[optional - description of the step - default:1]*<br/>
(String) options.steps *[optional - number of steps to push - default:'']*<br/>

```js
progress.next({description: 'Roger that !'});
```
