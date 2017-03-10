angular.module('moonshotApp')

.controller('SettingsCtrl', function($scope, version, Mfly, Accounts, Launchpad, Folders){

	  // PROFILE
    Mfly.getInteractiveInfo().then(function(data){
      // console.log(data);
      $scope.user = data;
    });

    Mfly.getCollections().then(function(data){
      $scope.collectionsLength = data.length;
    });

    // Accounts.user().then(function(user){
    //   console.log('User info :: ', user);
    //   var groups = user.product.roles;
    //   $scope.groups = groups;
    // });

    // Accounts.user();

    // DYNAMIC MOONSHOT CARD FOLDERS WILL BE IN A PHASE II 
    // FOLDERS
    // Folders.getFolders().then(function(folders){
    //   console.log('folders', folders);
    //   $scope.folders = folders;
    // });
      
    // ABOUT
    $scope.version = version;


});


