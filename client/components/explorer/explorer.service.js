'use strict';

angular.module('fileExplorerApp')
  .service('explorer', function ($rootScope, $state) {
    var currentPath;
    var selectedItems;

    var setCurrentPath = function (newPath) {
      currentPath = newPath;
      $state.go('shell.explorer.main.view', {path: newPath});
      $rootScope.$broadcast('path-changed', newPath);
      setSelectedItems([newPath]);
    };

    var getCurrentPath = function () {
      return currentPath;
    };

    var setSelectedItems = function (newSelectedItems) {
      selectedItems = newSelectedItems;
      $rootScope.$broadcast('selected-items-changed', newSelectedItems);
    };

    var getSelectedItems = function () {
      return selectedItems;
    };

    this.setCurrentPath = setCurrentPath;
    this.getCurrentPath = getCurrentPath;
    this.setSelectedItems = setSelectedItems;
    this.getSelectedItems = getSelectedItems;

    setCurrentPath('C:\\');
  });