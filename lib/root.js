'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function (cb) {
	var device;
	var root = process.cwd();
	function getDeviceRoot(dir) {
		fs.stat(dir, function (err, stats) {
			if (err) {return cb(err);}
			if (device === undefined) {device = stats.dev;}
			
			// We've reached a directory that's on a different mount, so the previous directory is the root.
			if (device !== stats.dev) {
				return cb(null, {root: root, device: device});
			}
			
			// If this directory is on the same device, then it is the new root.
			root = dir;
			
			// If the next directory is the same directory, we've reached the root of the filesystem.
			var nextDir = path.dirname(dir);
			if (nextDir === dir) {
				return cb(null, {root: root, device: device});
			}
			
			// Otherwise, inspect the next directory.
			getDeviceRoot(nextDir);
		});
	}
	getDeviceRoot(root);
};
