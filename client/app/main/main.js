'use strict';

angular.module('fileExplorerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        data: {
          pageTitle: 'בית'
        }
      });
  });