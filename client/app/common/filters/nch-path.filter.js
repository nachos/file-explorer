angular.module('fileExplorerApp')
  .filter('nchPath', function() {
  return function(input) {
    var path = require('path');
    return input.split(path.sep).join(' > ');
  };
});