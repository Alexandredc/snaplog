'use strict';

const logger = require('./index.js');

logger.success('We did it !');
logger.info('Roger that !');
logger.warn('Houston do you copy ??');

function engineChecking() {
	throw new Error('The engine is broken!');
}

try{
	engineChecking();
}
catch(err){
	logger.error(err);
}

logger.error('Houston we have a problem !');
logger.emergency('Mayday Mayday Mayday !');
logger.inspect({we: {find: {the: {black: [{box: '!!!!'}]}}}});


let progress = logger.progress({title: 'From Paris to New York', steps: 5});

setTimeout(nextCall, 1000, 'Roger that !');
setTimeout(nextCall, 2000, 'Houston do you copy ??');
setTimeout(nextCall, 4000, 'Houston we have a problem !');
setTimeout(nextCall, 6000, 'Mayday Mayday Mayday !');
setTimeout(nextCall, 8000, 'We did it !');

function nextCall(message) {
	progress.next({description: message});
}
