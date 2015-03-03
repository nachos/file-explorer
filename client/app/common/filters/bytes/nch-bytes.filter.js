'use strict';

angular.module('fileExplorerApp')
  .filter('nchBytes', [function () {
    return function (bytes) {
      if (typeof bytes !== 'number') {
        bytes = parseFloat(bytes);
      }

      if (bytes === 0) {
        return '0 bytes';
      } else if (isNaN(bytes) || !isFinite(bytes) || bytes < 0) {
        return '-';
      }

      var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
      var number = bytes / Math.pow(1024, Math.floor(exponent));

      if(bytes > 1024) {
        number = number.toString().substring(0, 4);
      }

      return number + ' ' + units[exponent];
    };
  }]);
