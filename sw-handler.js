const toolbox = require('sw-toolbox');
// Runtime cache configuration, using the sw-toolbox library.
toolbox.router.default = toolbox.networkFirst;