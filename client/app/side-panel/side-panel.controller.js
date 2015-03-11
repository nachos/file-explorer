'use strict';

angular.module('fileExplorerApp')
  .controller('SideBarController', function ($scope, $mdDialog, hotkeys) {
    var trash = require('trash');
    var rimraf = require('rimraf')

    $scope.item = {};
    $scope.$on('ItemSelected', function (ev, item) {
      $scope.item = item;
    });

    $scope.deleteItem = function () {

      trash([$scope.item.path], function (err) {
        console.log(err);
      });
    };

    hotkeys.bindTo($scope)
      .add({
      combo:'del',
      callback: function(){
        $scope.deleteItem();
      }
    });

    hotkeys.bindTo($scope)
      .add({
      combo: 'shift+del',
      callback: function(){
        var confirm = {};

        if ($scope.item.isFolder) {
          confirm = $mdDialog.confirm()
            .title('Delete folder')
            .content('Are you sure you want to permanently delete \'' + $scope.item.name + '\' folder?')
            .ok('I\'m sure')
            .cancel('Cancel');
        }
        else {
          confirm = $mdDialog.confirm()
            .title('Delete file')
            .content('Are you sure you want to permanently delete \'' + $scope.item.name + '\'?')
            .ok('I\'m sure')
            .cancel('Cancel');
        }
        $mdDialog.show(confirm).then(function () {
          rimraf($scope.item.path, function (err){
            if (err){
              console.log(err);
            }

          });
        });
      }
    });
  });
