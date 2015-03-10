'use strict';

angular.module('fileExplorerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.explorer', {
        abstract: true,
        templateUrl: 'app/explorer/explorer.html'
      });
  });
