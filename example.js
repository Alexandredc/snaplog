'use strict';

const logger = require('./snaplog.js');



var progress = logger.progress(60);

	// setInterval(progress.next, 1000);




logger.success('We did it !');
logger.info('Roger that !');
logger.warn('Houston we have a problem !');
logger.error('Mayday Mayday Mayday !');
