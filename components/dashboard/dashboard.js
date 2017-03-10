angular.module('moonshotApp')

.controller('DashboardCtrl', function($scope, $state, Mfly, ItemIcons, $mdMedia, $mdSidenav){

  var leftMenu = [
    {name: 'Dashboard', icon: 'home', state: 'dashboard'},
    {name: 'Present', icon: 'star', state: 'cards'},
    {name: 'Hierarchy', icon: 'folder', state: 'hierarchy'},
    {name: 'Collections', icon: 'featured_play_list', state: 'collections'},
    {name: 'Search', icon: 'search', state: 'search'},
    {name: 'Upload', icon: 'cloud_upload', state: 'search'}
  ];

  $scope.menu = leftMenu;

  $scope.isSideNavOpen = true;
  $scope.openNavigationMenu = function() {
    $scope.isSideNavOpen = !$scope.isSideNavOpen;
  };


  // RIGHT SIDE
  var pageTitle = $state.current.name;
  $scope.pageTitle = pageTitle;

  // USER
  Mfly.getInteractiveInfo().then(function(data){
    var user      = data.displayName;
    var firstName = user.substr(0,user.indexOf(' '));
    $scope.userName = firstName;
  });

  // FOLDERS
  Mfly.getFolder('__root__').then(function(hierarchy){
      var onlyFolders = _.filter(hierarchy, function(obj){
        return obj.type === 'folder';
      });

      console.log(onlyFolders);

      $scope.folders = onlyFolders;
      
  });

  // RECOMMENDED
  mflyCommands.getLastViewedContent()
    .then(function(data){
      var mIcons = ItemIcons.material();
          
      data.forEach(function(_item){
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


