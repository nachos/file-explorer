'use strict';

angular.module('fileExplorerApp')
  .controller('SideBarController', function ($scope) {
    $scope.item = {};
    $scope.$on('ItemSelected', function(ev, item) {
      $scope.item = item;
    });
  });
