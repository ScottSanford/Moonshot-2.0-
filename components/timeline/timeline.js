angular.module('moonshotApp')

.controller('TimelineCtrl', function(
    $scope, $location, $timeout, 
    Mfly, Launchpad, ItemIcons, Weather, Dialog, Reporting, 
    $mdDialog, $mdMedia, $cookies, Accounts){

    Weather.getCurrentLocation().then(function(data){
      $scope.currentLocation = data[4].formatted_address;
    });


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

        $scope.suggestions = data;
        $scope.$apply();
      });

    $scope.openShareModal = function(selectedItem, ev) {  
        Dialog.box('ShareItemCtrl', 'common/tmpls/share-item/share-item-modal.html', ev, selectedItem);
    };

    $scope.openCollectionModal = function(selectedItem, ev) {
        Dialog.box('AddToCollectionCtrl', 'common/tmpls/add-to-collection/add-to-collection-modal.html', ev, selectedItem);
    };

    // RIGHT SIDE

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
      
      $scope.showSpinnerWeather = false;
      $scope.showWeather = true;
      $scope.weather = data;

    });

    Weather.getDaily().then(function(data){
      $scope.showSpinnerWeather = false;
      $scope.dailyWeather = data.daily.data;   
    });

    function getRandomLoadTime(min, max) {
      return Math.random() * (max - min) + min;
    }

    // CUSTOM FILTER SEARCH
    $scope.openFilterDialog = function(ev) {
        
        $mdDialog.show({
          controller: 'FilteredSearchCtrl',
          templateUrl: 'common/tmpls/timeline/custom-filter-dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        }).then(function(obj) {
          
          $scope.showFilterSearch = true;

          $scope.filterKeyword = obj.keywords;
          $scope.filterType    = obj.type;

          var filteredResults = [];
          Mfly.filter(obj).then(function(results){
            $scope.results = results;
            filteredResults.push(results);
          });

          $scope.filteredResults = filteredResults;

          $scope.goToFilterItem = function(item) {
            if(item.type == 'folder') {
              $location.url('/hierarchy/' + item.id);
            } else {
              mflyCommands.openItem(item.id);
            }
          }
        });
       
    };

    // MY ITEMS
    $scope.upload = function (file) {
      // monkey patch for ngf-select trigger too early
      if (file === null) {
        return;
      } else {
        Dialog.box('UploadItemCtrl', 'common/tmpls/uploader/uploader-dialog.html', null, file);
      }
    };


    // Media Queries
    $scope.iPadPortrait  = $mdMedia('sm');
    $scope.iPadLandscape = $mdMedia('md');
    $scope.iPadAll       = $mdMedia('gt-md');


});


