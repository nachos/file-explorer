'use strict';

angular.module('fileExplorerApp')
  .controller('ShellController', ['$scope', function ($scope) {
  var ngui = require('nw.gui');
  var nwin = ngui.Window.get();
  $scope.isFullScreen = false;

  $scope.close = function () {
    window.close();
  };

  $scope.toggleFullscreen = function (){
    $scope.isFullScreen = !$scope.isFullScreen;
    nwin.toggleFullscreen();
  };

  $scope.hide = function (){
    nwin.minimize()
  }


}]);