var exec = require('child_process').exec;
var sysPath = require('path');
var fs = require('fs');

var mode = process.argv[2];

var fsExists = fs.exists || sysPath.exists;

var getBinaryPath = function(binary) {
  return sysPath.join('node_modules', '.bin', binary);
};

var execute = function(path, params, callback) {
  if (callback == null) callback = function() {};
  var command = path + ' ' + params;
  console.log('Executing', command);
  exec(command, function(error, stdout, stderr) {
    if (error != null) return process.stderr.write(stderr.toString());
    console.log(stdout.toString());
  });
};

var execNode = function(path, params, callback) {
  execute('node ' + getBinaryPath(path), params, callback);
};

if (mode === 'prepublish') {
  execute('coffee', '-o lib/ src/');
} else if (mode === 'postinstall') {
  fsExists(sysPath.join(__dirname, 'lib'), function(exists) {
    if (exists) return;
    execute('coffee', '-o lib/ src/');
  });
} else if (mode === 'test') {
  execNode('mocha',
    '--compilers coffee:coffee-script --require test/common.js --colors'
  );
}
