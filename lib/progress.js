'use strict';

const clc 	 = require('cli-color');
const moment = require('moment');
const charm  = require('charm');

/**
 * Build a progress bar in terminal
 * @type {class}
 */
module.exports = class Progress {

	/**
	 * Build a new Object
	 * @param  {String} time    		[headline that contain the time when the progress object was created]
	 * @param  {object} options 		[options for the progress bar]
	 *         {string} options.title 	[title of the progress bar]
	 *         {string} options.steps 	[total steps count]
	 * @return {function}         		[write progress bar in stdout]
	 */
	constructor(time, options) {
		this.firstWriting = true;
		this.charm = charm();
		this.charm.pipe(process.stdout);

		this.columns = process.stdout.columns - 31;
		this.indent = Array(32).join(' ');
		this.headLine = time + clc.xterm(232)('[progress] ') + options.title || 'Progression';

		this.steps = options.steps;
		this.state = 0;

		this.startTime = new Date().getTime();
		this.elapsedTime = clc.xterm(242)('0h 0m 0s');

		this.timer = setInterval(()=>this.liveTime(), 1000);

		this.description = '';

		return this.writeLog();
	}

	/**
	 * Update every second the time elapsed
	 */
	liveTime() {
		this.updateTime();
		this.writeLog();
	}

	/**
	 * Update the elapsed time
	 */
	updateTime() {
		let now  = new Date().getTime();
		let x    = now - this.startTime;
		let time = moment.duration(x);
		this.elapsedTime = clc.xterm(242)(time.hours() + 'h ') + clc.xterm(242)(time.minutes() + 'm ') + clc.xterm(242)(time.seconds() + 's');
	}

	/**
	 * Call a next step
	 * @param  {object} options [options for the next step]
	 *         {Number} options.steps [optional - number of steps default is 1]
	 *         {String} options.description [optional - description of the step]
	 */
	next(options) {
		options = options || {};
		let step = options.step || 1;

		this.updateTime();

		if (options.description) {
			this.description = options.description;
		}

		this.state = this.state + step;

		if (this.state !== this.steps) {
			this.writeLog();
		}
		else {
			this.writeLog();
			clearInterval(this.timer);
		}
	}

	/**
	 * Write the log in the stdout
	 */
	writeLog() {
		let output = this.buildOutputProgress();

		if (!this.firstWriting) {
			this.charm.move(0, -1).erase('end');
			this.charm.move(0, -1).erase('end');
			this.charm.move(0, -1).erase('end');
			this.charm.move(0, -1).erase('end');
		}

		this.firstWriting = false;

		this.charm.write(output);
	}

	/**
	 * Build the progressbar output
	 * @return {String}
	 */
	buildOutputProgress() {
		let bar   		= this.buildProgressBar();
		let stats 		= this.buildProgressStats();
		let description = this.buildProgressDescription();

		return `${this.headLine}\n${bar}\n${stats}\n${description}\n`;
	}

	/**
	 * Build the bar of the progress bar
	 * @return {String}
	 */
	buildProgressBar() {
		let completed = this.getProgressBarSize();
		let bar 	  = this.columns - completed;

		completed = clc.bgXterm(41)(Array(completed).join(' '));
		bar = clc.bgXterm(247)(Array(bar).join(' '));

		return `${this.indent} ${completed}${bar}`;
	}

	/**
	 * Build progress bar's stats
	 * @return {String}
	 */
	buildProgressStats() {
		let percent   = 'progression : ' + clc.xterm(241)(Math.round((this.state / this.steps) * 100) + '%');
		let completed = clc.bold('completed : ') + clc.xterm(241)(`${this.state}/${this.steps}`);
		let time 	  = clc.bold('elapsed time : ') + `${this.elapsedTime}`;

		return `${this.indent} ${percent} - ${completed} - ${time}`;
	}

	/**
	 *   Build progress bar's description
	 * @return {String}
	 */
	buildProgressDescription() {
		return `${this.indent} description: ${clc.xterm(241)(this.description)}`;
	}

	/**
	 * Calculate the bar size
	 * @return {[type]} [description]
	 */
	getProgressBarSize() {
		return Math.round((this.state * this.columns) / this.steps);
	}
};
