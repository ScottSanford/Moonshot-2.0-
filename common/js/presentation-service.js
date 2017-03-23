angular.module('moonshotApp')
    .factory('Present',function (Mfly, $q, $location, $stateParams, $state, $localStorage, $mdDialog) {
    
    	var self = {
    		data: $localStorage.slides    	
    	};

    	// master set ITEM Slide URL 
    	self.setCurrentItem = function(slug) {
    		// is item a single page document or image?
    		if ($stateParams.page == undefined && $stateParams.type == undefined) {
    			self.setSingleItemURL(slug);
    		}
    		// is item at least 2 pages (multi page document)
    		else if ($stateParams.page) {
    			// check if the current page in the multi page document is the last page
    			Mfly.getItem(slug).then(function(data){
    				// if is is the last
    				if (data.pages === parseInt($stateParams.page)) {
    					self.goToNextSlide();
    				} 
    				// if it's not the last page
    				else {
		    			var nextPage = $stateParams.page + 1;
		    			self.setMultiPageItemURL(slug, nextPage);   					
    				}
    			});
    		}
    		// is the item an Interactive? 
    		else if ($stateParams.type == 'interactive') {
    			self.setInteractiveURL(slug);
    		} 

    	};

    	self.getCurrentItem = function(item) {

    	};

        self.showCurrentItem = function() {
        	var deferred = $q.defer();
        	var slug = $stateParams.slug;
        	Mfly.getItem(slug).then(function(data){
        		deferred.resolve(data);
        	});

        	return deferred.promise;
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

        self.goToNextSlide = function() {
        	var currentItemIndex = _.findIndex(self.data, {
		      id: $stateParams.slug
		    });
		    var lastItemIndex = self.data.length - 1;
        	if (currentItemIndex !== lastItemIndex) {
			    var nextItemIndex = currentItemIndex + 1;
			    
			    for (var i = 0; i < self.data.length; i++) {
			      if (i == nextItemIndex) {
			      	// where we need to identify what the next item 
			      	// in the slideshow is...

			        var id = self.data[i].id;
			        Mfly.getItem(id).then(function(data){
			        	// is the next item a single page? 
			        	if ($stateParams.page == undefined && data.pages <= 1) {
			        		self.setSingleItemURL(data.id);
			        	}
			        	// is the next item a multi page document?
			        	else if ($stateParams.page == undefined && data.pages > 1) {
			        		$location.url('presentation/' + id + '?page=0');
			        	} 
			        	// is the current Item a multi page but not last page? 
			        	else if ($stateParams.page) {
			        		// check if the current page in the multi page document is the last page
			    			Mfly.getItem($stateParams.slug).then(function(response){
			    				// if is is the last
			    				if (response.pages === parseInt($stateParams.page)) {
			    					self.goToNextSlide();
			    				} 
			    				// if it's not the last page
			    				else {
					    			var nextPage = $stateParams.page + 1;
					    			self.setMultiPageItemURL(slug, nextPage);   					
			    				}
			    			});
			        	}
			        });
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
