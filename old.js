'use strict';

var moment = require('moment');
var string = require('string');
var chalk  = require('chalk');

/**
 * Ce service permet de logguer des informations
 * @module logger
 * @Todo ajouter une méthode de log dans un fichier
 */


/**
 * Cette méthode permet de logguer un message dans la console en couleur
 * @param {String} type (Info, Success, Warn, Alert)
 * @param {String} message
 */
exports.console = function console(type, message) {

    var time = chalk.white.bold(moment().format('YYYY-MM-DD HH:mm:ss'));
    var messageColored = '';

    // Error object formatting
    if (message instanceof Error) {
        messageColored+= getColoredMessage(type, message.message)+ '\n';
        messageColored+= chalk.red(message.stack)+ '\n';
    }
    else {
        messageColored = getColoredMessage(type, message);
    }

    var out = time + ' ' + messageColored;

    if (isActivated()) {
        process.stdout.write(out + '\n');
    }
};

/**
 * Retourne la couleur du lessage
 * @param {String} type
 * @param {String} message
 * @return {String} colorName
 */
var getColoredMessage = function getColoredMessage(type, message) {

    var colorName;

    switch(type) {
        case 'info'     : colorName = 'bgBlue';      break;
        case 'success'  : colorName = 'bgGreen';     break;
        case 'warn'     : colorName = 'bgYellow';    break;
        case 'alert'    : colorName = 'bgRed';       break;
        default         : colorName = 'bgWhite';     break;
    }

    return chalk[colorName](string(type).capitalize().s + ' : '+message);
};

/**
 * Retourne true or false si le slogs en console sont activés
 */
var isActivated = function isActivated() {
    if (global.config.log) {
        return (global.config.log.console && global.config.log.console !== false);
    }
    else {
        return true;
    }
};
