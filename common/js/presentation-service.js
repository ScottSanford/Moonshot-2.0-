angular.module('moonshotApp')
    .factory('PresentationService',function () {
    
    	var Presentation = {
    		details: null,
    		slides: null
    	};

    	Presentation.getDetails = function() {
    		return Presentation.details;
    	};

    	Presentation.getSlides = function() {
    		return Presentation.slides;
    	};

    	Presentation.putDetails = function(details) {
    		Presentation.details = details;
    	};

    	Presentation.putSlides = function(presentationSlides) {
    		Presentation.slides = presentationSlides;
    	};

    	return Presentation;

    });
