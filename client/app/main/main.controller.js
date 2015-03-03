'use strict';

angular.module('fileExplorerApp')
  .controller('MainController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var fs = require('fs');
    var async = require('async');
    var path = require('path');
    var _ = require('lodash');
    var shell = require('nw.gui').Shell;

    var buildFolder = function(directory){
      $scope.files = [];

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
              isFolder: stat.isDirectory()
            })
          });
        }, function (err, results) {
          results = _.sortBy(results, function(result){
            if (result){
              console.log(result);
              return !result.isFolder;
            }
          });
          $scope.files = results;
          $scope.$apply();
        });
      })
    };

    var dir = 'E:';

    buildFolder(dir);

    $scope.directories = dir.split(path.sep);

    $scope.goToDir = function(index){
      var newPath = "";
      for (var i = 0; i <= index; i++){
        newPath = path.join(newPath, $scope.directories[i]);
      }

      buildFolder(newPath);

      $scope.directories = newPath.split(path.sep);
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
        buildFolder(file.path);
      }
      else{
        shell.openItem(file.path);
      }
    };

  }]);
