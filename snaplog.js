'use strict';

const moment = require('moment');
const _ 	 = require('lodash');
const clc 	 = require('cli-color');
const charm  = require('charm');

class Snaplog {

	constructor () {
		this.options = {
			enabled: true,
			time: {
				enabled: true,
				format: 'YYYY-MM-DD HH:mm:ss'
			},
			levels: {
				success: {enabled: true, color: 'green'},
				info   : {enabled: true, color: 'blue'},
				warn   : {enabled: true, color: 'yellow'},
				error  : {enabled: true, color: 'red'}
			}
		};
	}

	/**
	 * Merge options with default
	 * @param  {Object} options
	 */
	config(options) {
		_.merge(this.options, options);
	}

	success(message) {
		this._output('success', message);
	}

	info(message) {
		this._output('info', message);
	}

	warn(message) {
		this._output('warn', message);
	}

	error(message) {
		this._output('error', message);
	}

	progress (options) {
		let time = this.getTime();
		return new Progress(time, options);
	}

	/**
	 * Return the current time
	 * @return {String}
	 */
	getTime() {
		let now = moment().format(this.options.time.format);
		return `[${clc.blackBright(now)}]`;
	}

	/**
	 * Output the message
	 * @param  {String} level
	 * @param  {Mixte} message
	 */
	_output(level, message) {
		if (this.options.enabled && this.options.levels[level].enabled) {

			let output = '';

			if (this.options.time.enabled) {
				output += this.getTime();
			}

			let levelOut;
			switch (level) {
				case 'success' 	: levelOut = `[${level} ]`; break;
				case 'info' 	: levelOut = `[ ${level}   ]`; break;
				case 'warn' 	: levelOut = `[warning ]`; break;
				case 'error' 	: levelOut = `[ ${level}  ]`; break;
			}

			levelOut = clc[this.options.levels[level].color](levelOut);

			output += `${levelOut} ${message} \n`;

			process.stdout.write(output);
		}
	}
}

class Progress {

	constructor(time, options) {
		this.charm 	  = charm();
		this.charm.pipe(process.stdout);

		this.columns  = process.stdout.columns - 31;
		this.indent   = Array(32).join(' ');
		this.headLine = time + clc.xterm(232)('[progress] ') + options.title || 'Progression';

		this.steps 	  = options.steps;
		this.state 	  = 0;

		this.start_time   = new Date().getTime();
		this.elapsed_time = clc.xterm(242)('0h 0m 0s');

		this.timer = setInterval(()=>this.liveTime(), 1000);
		this.description = '';

		return this.writeLog();
	}

	liveTime() {
		this.updateTime();
		this.writeLog();
	}

	updateTime() {
		let now  = new Date().getTime();
		let x    = now - this.start_time;
		let time = moment.duration(x);
		this.elapsed_time = clc.xterm(242)(time.hours()+'h ') + clc.xterm(242)(time.minutes()+'m ') + clc.xterm(242)(time.seconds()+'s');
	}

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

	writeLog() {
		let output = this.buildOutputProgress();

		if (this.state !== 0) {
			this.charm.move(0, -1).erase('end');
			this.charm.move(0, -1).erase('end');
			this.charm.move(0, -1).erase('end');
			this.charm.move(0, -1).erase('end');
		}

		this.charm.write(output);
	}

	buildOutputProgress() {
		let bar   		= this.buildProgressBar();
		let stats 		= this.buildProgressStats();
		let description = this.buildProgressDescription();

		return `${this.headLine}\n${bar}\n${stats}\n${description}\n`;
	}

	buildProgressBar() {
		let completed = this.getProgressBarSize();
		let bar 	  = this.columns - completed;

		completed = clc.bgXterm(41)(Array(completed).join(' '));
		bar 	  = clc.bgXterm(247)(Array(bar).join(' '));

		return `${this.indent} ${completed}${bar}`;
	}

	buildProgressStats() {
		let percent   = 'progression : ' + clc.xterm(241)(Math.round((this.state / this.steps) * 100) + '%');
		let completed = clc.bold('completed : ') + clc.xterm(241)(`${this.state}/${this.steps}`);
		let time 	  = clc.bold('elapsed time : ') + `${this.elapsed_time}`;

		return `${this.indent} ${percent} - ${completed} - ${time}`;
	}

	buildProgressDescription() {
		return `${this.indent} description: ${clc.xterm(241)(this.description)}`;
	}


	getProgressBarSize() {
		return Math.round((this.state * this.columns) / this.steps);
	}

}



module.exports = new Snaplog();
