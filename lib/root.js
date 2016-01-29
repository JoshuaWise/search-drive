'use strict';
var path = require('path');
var os = require('os');

module.exports = function () {
	if (os.platform === 'win32') {
		return process.cwd().split(path.sep)[0];
	}
	return '/';
};
