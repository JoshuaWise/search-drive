'use strict';
module.exports = function (searchTerm, cb) {
	var readdir = require('fs').readdir;
	var lstat = require('fs').lstat;
	var joinPath = require('path').join;
	var device = 0;
	var matches = [];
	var pendings = 0;
	function searchFolder(dir) {
		pendings++;
		readdir(dir, function (err, items) {
			err || processItems(dir, items);
			--pendings || cb(null, matches);
		});
	}
	function processItems(dir, items) {
		for (var i=0, len=items.length; i<len; i++) {
			var item = items[i];
			var itemPath = joinPath(dir, item);
			if (item === searchTerm) {
				matches.push(itemPath);
			}
			searchItem(itemPath);
		}
	}
	function searchItem(itemPath) {
		pendings++;
		lstat(itemPath, function (err, stats) {
			if (!err && stats.isDirectory() && stats.dev === device) {
				searchFolder(itemPath);
			}
			--pendings || cb(null, matches);
		});
	}
	require('./lib/root')(function (err, rootInfo) {
		if (err) {
			cb(err);
		} else {
			device = rootInfo.device;
			searchFolder(rootInfo.root);
		}
	});
};
