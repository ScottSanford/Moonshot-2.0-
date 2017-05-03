angular.module('moonshotApp')

.controller('DashboardCtrl', function($scope, $state, Mfly, ItemIcons, $mdMedia, $mdSidenav, Accounts){

  // FOLDERS
  Mfly.getFolder('__root__').then(function(hierarchy){
      var onlyFolders = _.filter(hierarchy, function(obj){
        return obj.type === 'folder';
      });

      var mIcons = ItemIcons.material();
          
      onlyFolders.forEach(function(_item){
          mIcons.forEach(function(icon){
              if (_item.type == icon.type) {
                  _item['icon'] = icon.icon;
              }
          });
      });

      $scope.folders = onlyFolders;
      
  });

  // RECOMMENDED
  mflyCommands.getLastViewedContent().then(function(data){
    console.log("Last Viewed:: " ,data);
      var mIcons = ItemIcons.material();
          
      data.forEach(function(_item){
          // videos do not have a resourceUrl
          if (_item.type == 'Video') {
            _item['resourceUrl'] = _item['thumbnailUrl'];
          };

          mIcons.forEach(function(icon){
              if (_item.type == icon.type) {
                  _item['icon'] = icon.icon;
              }
          });
      });



      $scope.suggestions = data;
      $scope.$apply();
    });

});


