'use strict';

angular.module('fileExplorerApp')
  .controller('MainToolbarController', function ($scope, $mdSidenav, $window, explorer) {
    var path = require('path');

    var pathChanged = function (event, newPath) {
      $scope.directories = newPath.split(path.sep);
    };

    var changedListener = $scope.$on('path-changed', pathChanged);

    $scope.toggleSideNav = function(){
      $mdSidenav('left').toggle();
    };

    $scope.navToDir = function(index){
      var newPath = "./";
      for (var i = 0; i <= index; i++){
        newPath = path.join(newPath, $scope.directories[i]);
      }

      explorer.setCurrentPath(newPath);
    };

    $scope.$on('$destroy', function () {
      changedListener();
    });

    $scope.goBack = function (){
      $window.history.back();
    };
    $scope.goForward = function (){
      $window.history.forward();
    };
  });
