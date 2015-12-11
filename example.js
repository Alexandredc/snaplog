'use strict';

const logger = require('./snaplog.js');

logger.info('Roger that !');
logger.warn('Houston we have a problem !');
logger.error('Mayday Mayday Mayday !');


let total = 132;

let progress = logger.progress({title: 'From Paris to New York', steps: total});

for(let i = 0; i < total; i++) {

	switch (i) {
		case 1   : progress.next({description: 'Roger that !'}); break;
		case 54  : progress.next({description: 'Houston we have a problem !'}); break;
		case 87  : progress.next({description: 'Mayday Mayday Mayday !'}); break;
		case 130 : progress.next({description: 'We did it !'}); break;
		default  : progress.next();
	}

	for (let i = 0; i < 50000000; i++) {

	}
}

logger.success('We did it !');
