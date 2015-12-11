'use strict';

const logger = require('./index.js');

logger.info('Roger that !');
logger.warn('Houston we have a problem !');
logger.error('Mayday Mayday Mayday !');
logger.success('We did it !');

let progress = logger.progress({title: 'From Paris to New York', steps: 4});

setTimeout(nextCall, 1000, 'Roger that !');
setTimeout(nextCall, 3000, 'Houston we have a problem !');
setTimeout(nextCall, 5000, 'Mayday Mayday Mayday !');
setTimeout(nextCall, 7000, 'We did it !');

function nextCall(message) {
	progress.next({description: message});
}
