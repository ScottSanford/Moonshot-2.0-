angular.module('moonshotApp')
    .factory('Reporting', function($q, $http, $sessionStorage, Mfly) {
    
    	var Reporting = {};

    	var warehouse = "https://warehouseapi.mediafly.com/";
    	var launchpad = "https://launchpadapi.mediafly.com/2/items/";
        var accounts  = "https://accounts.mediafly.com/api/3.0/";

        Reporting.getAccessToken = function() {
        	var baseUrl = "https://accounts.mediafly.com/api/3.0/authentication/authenticate";

        	Mfly.getInteractiveInfo().then(function(data){
        		console.log(data.user);
        		var user = data.user;
        		var pass = "Kiyo$aki123";
	        	var params = {
	        		username: user, 
	        		password: pass
	        	}
	        	$http({
	        		method: 'POST',
	        		url: baseUrl, 
	        		params: params
	        	}).success(function(data){
		            	console.log(data);
		                // $sessionStorage.token = data.accessToken;
		          })
	        	  .error(function(err){
	        	  		console.log("Error -->", err);
	        	  })
	        });


	    };

        Reporting.summary = function() {
        	var token = $sessionStorage.token;
        	var params = {
        		accessToken: token, 
        		productId: "f61ef3521a9b458eb757b619e2e4c39e", 
        		dateRangefrom: "11/01/2016",
        		dateRangeto: "12/05/2016"
        	}
        	$http({
        		method: "GET",
        		url: warehouse, 
        		params: params
        	}).success(function(response){
        		console.log("SUCCESS == ", response);
        	}).error(function(response){
        		console.log("Something went wrong :: ", response);
        	})
        };

        Reporting.user = function() {
            
        };

        

    	return Reporting;

    });
