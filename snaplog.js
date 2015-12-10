'use strict';

const moment = require('moment');
const _ 	 = require('lodash');
const clc 	 = require('cli-color');

class Snaplog {

	constructor () {
		this.options = {
			enabled: true,
			time: {
				enabled: true,
				format: 'YYYY-MM-DD HH:mm:ss'
			},
			levels: {
				success: {
					enabled: true,
					color: 'green'
				},
				info: {
					enabled: true,
					color: 'blue'
				},
				warn: {
					enabled: true,
					color: 'yellow'
				},
				error: {
					enabled: true,
					color: 'red'
				}
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

	progress (steps) {
		return new Progress(steps);
	}

	/**
	 * Output the message
	 * @param  {String} level
	 * @param  {Mixte} message
	 */
	_output(level, message) {
		if (this.options.enabled && this.options.levels[level].enabled) {

			let out = '';

			if (this.options.time.enabled) {
				let now = moment().format(this.options.time.format);
					now = clc.blackBright(now);

				out += `[${now}]`;
			}

			let levelOut;
			switch (level) {
				case 'success' 	: levelOut = `[${level} ]`; break;
				case 'info' 	: levelOut = `[ ${level}   ]`; break;
				case 'warn' 	: levelOut = `[warning ]`; break;
				case 'error' 	: levelOut = `[ ${level}  ]`; break;
			}

			levelOut = clc[this.options.levels[level].color](levelOut);

			out += `${levelOut} ${message} \n`;

			process.stdout.write(out);
		}
	}
}

class Progress {

	constructor(steps) {
		let columns = process.stdout.columns - 31;

		let now = moment().format('YYYY-MM-DD HH:mm:ss');
			now = clc.blackBright(now);

		var progress = Array(columns).join(' ');

		process.stdout.write('['+clc.blackBright(now)+'][progress] '+clc.bgXterm(243)(progress));
	}

	next(step) {

	}
}



module.exports = new Snaplog();
