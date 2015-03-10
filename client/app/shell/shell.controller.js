'use strict';

angular.module('fileExplorerApp')
  .controller('ShellController', ['$scope', function ($scope, $window) {
  var ngui = require('nw.gui');
  var nwin = ngui.Window.get();
  $scope.isFullScreen = false;

  $scope.close = function () {
    nwin.close();
  };

  $scope.toggleFullscreen = function (){
    $scope.isFullScreen = !$scope.isFullScreen;
    nwin.toggleFullscreen();
  };

  $scope.hide = function (){
    nwin.minimize()
  };
}]);