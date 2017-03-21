angular.module('moonshotApp')
    .factory('Present',function (Mfly, $q, $location, $stateParams, $state, $localStorage, $mdDialog) {
    
    	var self = {
    		data: $localStorage.slides    	
    	};

        self.showCurrentItem = function() {
        	var deferred = $q.defer();
        	var slug = $stateParams.slug;
        	Mfly.getItem(slug).then(function(data){
        		deferred.resolve(data);
        	});

        	return deferred.promise;
        };

        self.getSelectedItem = function(slug) {
        	$location.url('presentation/' + slug);
        };

        self.goToPreviousSlide = function() {

        };

        self.goToNextSlide = function() {
        	var currentItemIndex = _.findIndex(self.data, {
		      id: $stateParams.slug
		    });
		    var lastItemIndex = self.data.length - 1;
        	if (currentItemIndex !== lastItemIndex) {
			    var nextItemIndex = currentItemIndex + 1;
			    
			    for (var i = 0; i < self.data.length; i++) {
			      if (i == nextItemIndex) {
			        var id = self.data[i].id;
			        $location.url('presentation/' + id);
			      }
			    }
        	} else {
        		self.showLastItemDialog();
        	}
        };

        self.getFirstItem = function() {
			var firstItem = _.find($localStorage.slides,function(obj, index){
			    if (index == 0) {
			      return obj;
			    }
			});

			$location.url('presentation/' + firstItem.id);
        };

        self.showLastItemDialog = function() {
        	$mdDialog.show({
		      controller: 'RestartPresCtrl',
		      templateUrl: 'common/tmpls/presentation/restart/restart-presentation-modal.html',
		      parent: angular.element(document.body),
		      // targetEvent: ev,
		      clickOutsideToClose:true,
		    }).then(function() {
		        
		    });
        };
    	return self;

    });
