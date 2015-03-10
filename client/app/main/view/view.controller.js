'use strict';

angular.module('fileExplorerApp')
  .controller('MainViewController', function ($scope, $rootScope, $mdSidenav, $timeout, explorer, $stateParams) {
  var fs = require('fs');
  var async = require('async');
  var path = require('path');
  var _ = require('lodash');
  var shell = require('nw.gui').Shell;
  var nativeApi = require('native-api');
  var nativeFile = nativeApi.file;
  var directory = $stateParams.path;

  fs.readdir(directory, function (err, files) {
    async.map(files, function (file, cb) {
      var filePath = path.join(directory, file);

      fs.stat(filePath, function (err, stat) {
        if (err) {
          return cb(err);
        }

        return cb(null, {
          name: file,
          dir: directory,
          path: filePath,
          stat: stat,
          nativeStat: nativeFile.getFileStats(filePath),
          isFolder: stat.isDirectory()
        })
      });
    }, function (err, results) {
      results = _.sortBy(results, function(result){
        if (result){
          return !result.isFolder;
        }
      });

      // Not filtering well, can't access protected files
      results = _.filter(results, function(result){
        if(result){
          return result;
        }
      });

      $timeout(function () {
        $scope.files = results;
      });
    });
  });

  $scope.goToDir = function(newPath){
    explorer.setCurrentPath(newPath);
  };

  $scope.selectedItem = undefined;

  $scope.selectItem = function (item){
    if ($scope.selectedItem !== item) {
      $scope.selectedItem = item;
      $rootScope.$broadcast('ItemSelected', item);
    }
    else {
      $scope.selectedItem = undefined;
    }
  };

  $scope.openFile = function (file) {
    if(file.isFolder){
      $scope.goToDir(file.path);
    }
    else{
      shell.openItem(file.path);
    }
  };

});