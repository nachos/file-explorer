'use strict';

angular.module('fileExplorerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.explorer.main.view', {
        url: '/view/{path}',
        controller: 'MainViewController',
        templateUrl: 'app/main/view/view.html'
      });
  });
