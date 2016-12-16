angular.module('moonshotApp')

.controller('TimelineCtrl', function($scope, $location, $timeout, Mfly, ItemIcons, Weather, $mdDialog){

    // LEFT

    // CARDS
    $scope.goToCards = function() {
        $location.url('/cards');
    };

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

    $scope.goToFolderDetails = function(id) {
      $location.url('/hierarchy/' + id);
    };

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
        console.log(data);

        $scope.suggestions = data;
        $scope.$apply();
      });

    $scope.openShareModal = function(selectedItem, ev) {
        $mdDialog.show({
          controller: 'ShareItemCtrl',
          templateUrl: 'common/tmpls/share-item/share-item-modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true, 
          locals: {
            item: selectedItem
          }
        }).then(function() {
            
        });
    };

    $scope.openCollectionModal = function(selectedItem, ev) {
        console.log(selectedItem);
        $mdDialog.show({
          controller: 'AddToCollectionCtrl',
          templateUrl: 'common/tmpls/add-to-collection/add-to-collection-modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true, 
          locals: {
            item: selectedItem
          }
        }).then(function() {
            
        });
       
    };

    // RIGHT
    function getTimeOfDay() {
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
          return "Good Morning";
        } else if (curHr < 18) {
          return "Good Afternoon";
        } else {
          return "Good Evening";
        }
    };

    $scope.timeOfDay = getTimeOfDay();

    // USER
    Mfly.getInteractiveInfo().then(function(data){
      $scope.user = data;
    });

    // COLLECTIONS
    Mfly.getCollections().then(function(data){
      $scope.collectionsLength = data.length;
    });

    // WEATHER
    $scope.showSpinnerWeather = true;
    $scope.showWeather = false;

    Weather.getCurrent().then(function(data){
     
      var skycons = new Skycons({color:"#999"});
      skycons.add('weatherIcon', data.currently.icon);
      skycons.play();
      
      $timeout(function(){
        $scope.showSpinnerWeather = false;
        $scope.showWeather = true;
        $scope.weather = data;
      }, getRandomLoadTime(1500,3000));

    });

    Weather.getDaily().then(function(data){
      $scope.showSpinnerWeather = false;

      $scope.dailyWeather = data.daily.data;   
    });

    function getRandomLoadTime(min, max) {
      return Math.random() * (max - min) + min;
    }

});


