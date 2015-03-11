'use strict';
angular.module('fileExplorerApp', ['ngMaterial', 'ui.router', 'cfp.hotkeys'])
  .config(function ($mdThemingProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/view/c:');

    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('orange');
  })
  .run(function (explorer){
    explorer.setCurrentPath('E:');
  });
