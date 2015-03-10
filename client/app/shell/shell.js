'use strict';

angular.module('fileExplorerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell', {
        abstract: true,
        controller: 'ShellController',
        templateUrl: 'app/shell/shell.html'
      });
  });
