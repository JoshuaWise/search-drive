# search-drive
Searches the entire computer for all files and directories that match the given name.

## Usage

```
var search = require('search-drive');
search('.git', function (err, matches) {
	matches[0];		// "/foo/bar/baz/.git"
	matches[1];		// "/path/to/project/.git"
	matches.length 	// 2
});
```

## Limitations
`search-drive` only looks within the filesystem device of the processes' **current working directory**. Do not change the current working directory after you invoke this function, before the callback is invoked.
