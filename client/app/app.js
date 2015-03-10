'use strict';
angular.module('fileExplorerApp', ['ngMaterial', 'ui.router'])
  .config(function ($mdThemingProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/view');

    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('orange');
  })
  .run(function (explorer){
    explorer.setCurrentPath('E:');
  });
