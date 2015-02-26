'use strict';

angular.module('fileExplorerApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

  })


  .run(function ($rootScope, $state) {
    // Redirect to login if you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      next.data = next.data || {};

    });
  });
