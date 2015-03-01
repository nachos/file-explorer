'use strict';

angular.module('fileExplorerApp', ['ui.router', 'ngMaterial'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    $urlRouterProvider

      .otherwise('/');
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('orange');
  })


  .run(function ($rootScope, $state) {
    // Redirect to login if you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      next.data = next.data || {};

    });
  });
