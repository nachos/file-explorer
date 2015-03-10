'use strict';

angular.module('fileExplorerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.explorer.main', {
        abstract: true,
        templateUrl: 'app/main/main.html'
      });
  });
