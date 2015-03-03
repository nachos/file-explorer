'use strict';

angular.module('fileExplorerApp')
  .controller('MainController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var fs = require('fs');
    var async = require('async');
    var path = require('path');
    var _ = require('lodash');
    var shell = require('nw.gui').Shell;

    $scope.files = [];

    $scope.dir = 'E:\\test';

    fs.readdir($scope.dir, function (err, files) {
      async.map(files, function (file, cb) {
        var filePath = path.join($scope.dir, file);
        fs.stat(filePath, function (err, stat) {
          if (err) {
            return cb(err);
          }

          return cb(null, {
            name: file,
            dir: $scope.dir,
            path: filePath,
            stat: stat,
            isFolder: stat.isDirectory()
          })
        });
      }, function (err, results) {
        results = _.sortBy(results, function(result){
          return !result.isFolder;
        });
        $scope.files = results;
        $scope.$apply();
      });
    });

    $scope.selectedItem = undefined;

    $scope.selectItem = function (item){
      if ($scope.selectedItem !== item) {
        $scope.selectedItem = item;
        console.log(item.stat);
        $rootScope.$broadcast('ItemSelected', item);
      }
      else {
        $scope.selectedItem = undefined;
      }
    };

    $scope.openFile = function (file) {
      shell.openItem(file.path);
    };

  }]);
