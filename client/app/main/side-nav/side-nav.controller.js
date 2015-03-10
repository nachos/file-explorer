'use strict';

angular.module('fileExplorerApp')
  .controller('MainSideNavController', function ($scope, $mdSidenav, explorer) {
    $scope.goToDir = function(newPath){
      explorer.setCurrentPath(newPath);
    };

    $scope.toggleSideNav = function(){
      $mdSidenav('left').toggle();
    };

  });