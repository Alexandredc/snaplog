'use strict';

const moment 	= require('moment');
const _ 	 	= require('lodash');
const clc 	 	= require('cli-color');
const Progress 	= require('./progress');

/**
 * Build a snaplog
 * @type {[type]}
 */
module.exports = class Snaplog {

	constructor () {
		this.options = {
			enabled: true,
			time: {
				enabled: true,
				format: 'YYYY-MM-DD HH:mm:ss'
			},
			levels: {
				success: {enabled: true, color: 'green'},
				info: {enabled: true, color: 'blue'},
				warn: {enabled: true, color: 'yellow'},
				error: {enabled: true, color: 'red'}
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

	/**
	 * success logger
	 * @param  {String} message
	 */
	success(message) {
		this._output('success', message);
	}

	/**
	 * info logger
	 * @param  {String} message
	 */
	info(message) {
		this._output('info', message);
	}

	/**
	 * warn logger
	 * @param  {String} message
	 */
	warn(message) {
		this._output('warn', message);
	}

	/**
	 * error logger
	 * @param  {String} message
	 */
	error(message) {
		this._output('error', message);
	}

	/**
	 * progress logger
	 * @param  {object} options 		[options for the progress bar]
	 *         {string} options.title 	[title of the progress bar]
	 *         {string} options.steps 	[total steps count]
	 * @return {Object} Progress
	 */
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
};
