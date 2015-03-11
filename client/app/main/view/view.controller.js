'use strict';

angular.module('fileExplorerApp')
  .controller('MainViewController', function ($scope, $rootScope, $mdSidenav, $timeout, explorer, $stateParams, hotkeys) {
    var fs = require('fs');
    var async = require('async');
    var path = require('path');
    var _ = require('lodash');
    var shell = require('nw.gui').Shell;
    var nativeApi = require('native-api');
    var nativeFile = nativeApi.file;
    var directory = $stateParams.path;

    var MIN_ITEMS_PER_ROW = 1;
    var MAX_ITEMS_PER_ROW = 7;

    $scope.itemsPerRow = 4;
    $scope.Math = window.Math;

    fs.readdir(directory, function (err, items) {
      async.map(items, function (item, cb) {
        var itemPath = path.join(directory, item);

        fs.stat(itemPath, function (err, stat) {
          if (err) {
            return cb(err);
          }

          return cb(null, {
            name: item,
            dir: directory,
            path: itemPath,
            stat: stat,
            nativeStat: nativeFile.getFileStats(itemPath),
            isFolder: stat.isDirectory()
          })
        });
      }, function (err, results) {
        results = _.sortBy(results, function (result) {
          if (result) {
            return !result.isFolder;
          }
        });

        // Not filtering well, can't access protected files
        results = _.filter(results, function (result) {
          if (result) {
            return result;
          }
        });

        $timeout(function () {
          $scope.items = results;
        });
      });
    });

    $scope.goToDir = function (newPath) {
      explorer.setCurrentPath(newPath);
    };

    $scope.selectedItemIndex = undefined;

    $scope.selectItem = function (index) {
      if ($scope.selectedItemIndex !== index) {
        $scope.selectedItemIndex = index;
        $rootScope.$broadcast('ItemSelected', $scope.items[index]);
      }
      else {
        $scope.selectedItemIndex = undefined;
      }
    };

    $scope.openItem = function (file) {
      if (file.isFolder) {
        $scope.goToDir(file.path);
      }
      else {
        shell.openItem(file.path);
      }
    };

    hotkeys.add({
      combo: 'right',
      description: 'Select the item on the right of the selected item',
      callback: function () {
        if(!$scope.selectedItemIndex){
          $scope.selectedItemIndex = 0;
        }

        if($scope.selectedItemIndex + 1 < $scope.items.length)
        {
          $scope.selectItem($scope.selectedItemIndex + 1);
        }
      }
    });

    hotkeys.add({
      combo: 'left',
      description: 'Select the item on the left of the selected item',
      callback: function () {
        if(!$scope.selectedItemIndex){
          $scope.selectedItemIndex = 0;
        }

        if($scope.selectedItemIndex - 1 >= 0)
        {
          $scope.selectItem($scope.selectedItemIndex - 1);
        }
      }
    });

    hotkeys.add({
      combo: 'down',
      description: 'Select the item below the selected item',
      callback: function () {
        if(!$scope.selectedItemIndex){
          $scope.selectedItemIndex = 0;
        }

        if($scope.selectedItemIndex + $scope.itemsPerRow < $scope.items.length)
        {
          $scope.selectItem($scope.selectedItemIndex + $scope.itemsPerRow);
        }
      }
    });

    hotkeys.add({
      combo: 'up',
      description: 'Select the item on top of the selected item',
      callback: function () {
        if(!$scope.selectedItemIndex){
          $scope.selectedItemIndex = 0;
        }

        if($scope.selectedItemIndex - $scope.itemsPerRow >= 0){
          $scope.selectItem($scope.selectedItemIndex - $scope.itemsPerRow);
        }
      }
    });

    hotkeys.add({
      combo: 'enter',
      description: 'Open selected item',
      callback: function () {
        $scope.openItem($scope.items[$scope.selectedItemIndex]);
      }
    });

    hotkeys.add({
      combo: '+',
      description: 'Increase number of items per row (should be ctrl++ not working for now)',
      callback: function () {
        if ($scope.itemsPerRow < MAX_ITEMS_PER_ROW) {
          $scope.itemsPerRow++;
        }
      }
    });

    hotkeys.add({
      combo: 'ctrl+-',
      description: 'Decrease number of items per row',
      callback: function () {
        if($scope.itemsPerRow > MIN_ITEMS_PER_ROW) {
          $scope.itemsPerRow--;
        }
      }
    });
  });