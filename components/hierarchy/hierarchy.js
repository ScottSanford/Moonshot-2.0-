

angular.module('moonshotApp')

.controller('HierachyCtrl', function($scope, Mfly){


    // FOR: FOLDER LIST PAGE
    Mfly.getFolder('__root__').then(function(data){
      var folders = _.filter(data, function(item){
        if (item.type === 'folder') {
          return item;
        }
      });
      console.log(folders);
      $scope.folders = folders;
    });


});


