'use strict';

angular.module('fileExplorerApp')
  .controller('MainController', ['$scope', '$rootScope', '$mdSidenav', function ($scope, $rootScope, $mdSidenav) {
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
              return !result.isFolder;
            }
          });
          $scope.files = results;
          $scope.$apply();
        });
      })
    };

    var buildDirectories = function(newPath){
      $scope.directories = newPath.split(path.sep);
    };

    $scope.goToDir = function(newPath){
      if($scope.currentDir !== newPath) {
        buildFolder(newPath);

        buildDirectories(newPath);

        $scope.currentDir = newPath;
      }
    };

    $scope.currentDir = 'E:';

    buildFolder($scope.currentDir);

    buildDirectories($scope.currentDir);


    $scope.navToDir = function(index){
      var newPath = "./";
      for (var i = 0; i <= index; i++){
        newPath = path.join(newPath, $scope.directories[i]);
      }

      $scope.goToDir(newPath);
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

    $scope.toggleSideNav = function(){
      $mdSidenav('left').toggle();
    };

  }]);
