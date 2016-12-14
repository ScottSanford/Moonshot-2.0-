angular.module('moonshotApp')

.controller('SettingsCtrl', function($scope, version, Mfly, Accounts, Launchpad){

	  // PROFILE
    Mfly.getInteractiveInfo().then(function(data){
      // console.log(data);
      $scope.user = data;
    });

    Mfly.getCollections().then(function(data){
      $scope.collectionsLength = data.length;
    });

    Accounts.user().then(function(user){
      console.log('User info :: ', user);
      var groups = user.product.roles;
      $scope.groups = groups;
    });

    Accounts.user();

    // FOLDERS
    Mfly.getFolder('__root__').then(function(data){
      var folders = _.filter(data, function(item){
        if (item.type === 'folder') {
          return item;
        }
      });
      
      $scope.folders = folders;
    });

    // ABOUT
    $scope.version = version;


});


