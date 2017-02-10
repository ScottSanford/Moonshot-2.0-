angular.module('moonshotApp')
    .factory('ContentService',function ($q, $stateParams, Mfly, $localStorage) {
    
    	var self = {
    		data: $localStorage.slides
    	};

        self.showItemSlide = function(slide, callback) {
        	
        	// var deferred = $q.defer();
        	var params = $stateParams;
        	if (slide) {
        		var itemId = slide.id;
        	} else {
        		var itemId = params.itemId;
        	}

        	return Mfly.getItem(itemId).then(function(item){
        	
				var paramPage = Number(params.page);

				// is item a single page document? 
				if (!item.pages || item.pages === 1 ) {
					return item;
				}
				// is this a multi page document?
				// and
				// is the Current Page the last page in this multi page document?
				else if (item.pages > 1 && paramPage == item.pages) {
					var multiPage = {
						currentPage: paramPage + 1, 
						slideUrl: item.resourceUrl,
						resourceUrl: item.resourceUrl
					};
					return multiPage;
				} 
				// is this a multi page document?
				// is current Page not the last page? 
				else if (item.pages > 1 && paramPage !== item.pages) {
					var multiPage = {
						currentPage: paramPage + 1, 
						slideUrl: item.resourceUrl,
						resourceUrl: item.resourceUrl
					};
					return multiPage;
				} 
		      
        		return false;
			});

        };

        // CONTROLS
        self.goToPreviousSlide = function() {

        };

        self.goToNextSlide = function() {

        	var itemIndex = Number($stateParams.index);
        	var presentation = $localStorage.slides;
        	var presentationLength = presentation.length;

        	// is there a next item?
        	if (itemIndex < presentationLength) {
        		var nextItemIndex = itemIndex + 1;
        		// now go get the matching Index in presentation
        		return self.showItemSlide(presentation[nextItemIndex]);
        		
        	}

        };


        self.getItemLength = function(item) {
        	if (item.pages == 0) {
        		self.isItemSinglePage();
        	} else if (item.pages >= 1) {
        		self.isItemMultiPage();
        	}
        	// var itemPages = item.pages;

        	// console.log(itemPages);
			// var hasPageNumber = Number($stateParams.page);


			// if (pageNum === slide.pages) {
			//       // GO TO NEXT SLIDE IN PRESENTATION
			//       var sameId = _.findWhere($scope.slides, {id: itemId});
			//       var idIndex = _.indexOf(sameId);
			//       var nextIndex = idIndex + 1;

			//       var nextItemId = $scope.slides[nextIndex].id;

			//       $location.url('/presentation/' + nextItemId + '?collection=' + collection + '&index=' + nextIndex);
			//     } else {
			//       var pageNumber = pageNum + 1;
			//       var sameId = _.findWhere($scope.slides, {id: itemId});
			//       var idIndex = _.indexOf(sameId);

			//       $location.url('/presentation/' + slide.id + '?collection=' + collection + '&page=' + pageNumber + '&index=' + idIndex);
			//     }
        }

        self.whichItemType = function() {
        	// set the new route
        	Mfly.getItem(itemId).then(function(item){
				var paramPage = Number(params.page);

				// is item a single page document? 
				if (item.pages == 0 || item.pages == 1) {
					callback(item);
				}
				// is this a multi page document?
				// and
				// is the Current Page the last page in this multi page document?
				else if (item.pages > 1 && paramPage == item.pages) {
					var multiPage = {
						currentPage: paramPage + 1, 
						slideUrl: item.resourceUrl
					};
					callback(multiPage);
				} 
				// is this a multi page document?
				// is current Page not the last page? 
				else if (item.pages > 1 && paramPage !== item.pages) {
					var multiPage = {
						currentPage: paramPage + 1, 
						slideUrl: item.resourceUrl
					};
					callback(multiPage);
				} 
		      
			});
        };

    	return self;

    });
