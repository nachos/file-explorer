'use strict';

angular.module('fileExplorerApp', ['ui.router', 'ngMaterial'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('orange');
  });
