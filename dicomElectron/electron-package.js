// electron pakcager
var electronPackager    = require('electron-packager');
 
// options
var options = {
    dir             : '.',
    out             : './release',
    appVersion      : '0.0.1',
    overwrite       : true,
    arch            : 'x64',
    name            : 'dicomViewer',
    icon:require('path').resolve(__dirname,"./112.ico")
};
 
// pack
electronPackager(options);