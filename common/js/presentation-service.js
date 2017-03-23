angular.module('moonshotApp')
    .factory('Present',function (Mfly, $q, $location, $stateParams, $state, $localStorage, $mdDialog) {
    
    	var self = {
    		data: $localStorage.slides    	
    	};

    	self.getCurrentItem = function(item) {
        	var deferred = $q.defer();
        	var slug = $stateParams.slug;
        	Mfly.getItem(slug).then(function(data){
        		deferred.resolve(data);
        	});

        	return deferred.promise;
    	};

        self.goToPreviousSlide = function() {
        	var currentItemIndex = _.findIndex(self.data, {
		      id: $stateParams.slug
		    });
		    var firstItemIndex = 0;
        	if (currentItemIndex !== firstItemIndex) {
			    var prevItemIndex = currentItemIndex - 1;
			    
			    for (var i = 0; i < self.data.length; i++) {
			      if (i == prevItemIndex) {
			        var id = self.data[i].id;
			        $location.url('presentation/' + id);
			      }
			    }
        	} else {
        		return;
        	}
        };

        self.goToNextSlide = function(slide) {
        	// get current ITEM
        	var currentItemIndex = _.findIndex(self.data, {
		      id: $stateParams.slug
		    });

		    var lastItemIndex = self.data.length - 1;

		    // is it the last item in the presentation? 
        	if (currentItemIndex !== lastItemIndex) {
			    var nextItemIndex = currentItemIndex + 1;
			    // first, is this a multi page item
			    if ($stateParams.page && parseInt($stateParams.page) < slide.pages) {
			    	var nextPage = parseInt($stateParams.page) + 1;
				    self.setMultiPageItemURL($stateParams.slug, nextPage);
			    } 
			    // if it's not a multipage item
			    else {
				    for (var i = 0; i < self.data.length; i++) {
				      if (i == nextItemIndex) {
				      	// where we need to identify what the next item 
				      	// in the slideshow is...
				      	var itemType  = self.data[i].type;
				      	var itemID    = self.data[i].id;
				      	var itemPages = self.data[i].pages;
				      	if (self.data[i].type == 'interactive') {
				      		self.setInteractiveURL(itemID);
				      	}
				      	// multi page
				      	else if (itemPages > 1) {
				      		var nextPage = parseInt($stateParams.page) + 1;
				      		$location.url('presentation/' + itemID + '?page=1');
				      	} 
				      	// single page 
				      	else {
				      		self.setSingleItemURL(itemID);
				      	}

				      	
				      }
				    }
			    }
			    
        	} else {
	        	if (parseInt($stateParams.page) < slide.pages) {
        			
        			for (var i = 0; i < self.data.length; i++) {
        				var itemID = self.data[i].id;
	        			var nextPage = parseInt($stateParams.page) + 1;

				      	self.setMultiPageItemURL(itemID, nextPage);
	        		} 

        		} else {

	        		self.showLastItemDialog();

	        	}
        	}
        };

        self.setSingleItemURL = function(slug) {
        	$location.url('presentation/' + slug);
        };

        self.setMultiPageItemURL = function(slug, pageNumber) {
        	$location.url('presentation/' + slug + '?page=' + pageNumber);
        };

        self.setInteractiveURL = function(slug) {
        	$location.url('presentation/' + slug + '?type=interactive');
        };

        self.setSelectedItem = function(item) {
        	if (item.type === 'interactive') {
            	self.setInteractiveURL(item.id);
	        } 
	        else if (item.pages > 1) {
	            $location.url('presentation/' + item.id + '?page=1');
	        }
	        else {
	            self.setSingleItemURL(item.id);
	        }
        };

        self.getFirstItem = function() {
			var firstItem = _.find($localStorage.slides,function(obj, index){
			    if (index == 0) {
			      return obj;
			    }
			});
			if (firstItem.type === 'interactive') {
            	self.setInteractiveURL(firstItem.id);
	        } 
	        else if (firstItem.pages > 1) {
	            $location.url('presentation/' + firstItem.id + '?page=1');
	        }
	        else {
	            self.setSingleItemURL(firstItem.id);
	        }
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

        self.getPageRange = function(pages) {
        	var pageRange = _.range(1, pages + 1);

	      	var itemPages = _.map(pageRange, function(obj){
		        var obj = {
		          id: obj - 1,
		          pageNum: obj
		        };

		        return obj;
	        });

	        return itemPages;
        };

    	return self;

    });
