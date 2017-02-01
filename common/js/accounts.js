angular.module('moonshotApp')
    .factory('Accounts', function($q, $http, $sessionStorage, Mfly) {
    
    	var Accounts = {};
        var accountsUrl  = "https://accounts.mediafly.com/api/3.0/";

        Accounts.getAccessToken = function(accountPass) {
            var deferred = $q.defer();
        	Mfly.getInteractiveInfo().then(function(data){
                var accessUrl = accountsUrl + 'authentication/authenticate'
        		var user = data.user;
        		var pass = accountPass; // password
	        	var params = {
	        		username: user, 
	        		password: pass
	        	};

	        	$http({
	        		method: 'POST',
	        		url: accessUrl, 
	        		params: params
	        	})
                .success(function(data, status){
                    deferred.resolve(data);
		        })
        	    .error(function(err, status){
        	  		deferred.resolve(data);
        	    })
	        });

            return deferred.promise;

	    };

        Accounts.user = function(accessToken, userId) {
            var deferred = $q.defer();

            var userUrl = accountsUrl + 'users/get';

            var params = {
                accessToken: accessToken,
                productId: "f61ef3521a9b458eb757b619e2e4c39e",  
                userId: userId
            };

            $http({
                method: 'GET', 
                url: userUrl,
                params: params
            })
            .success(function(response){
                deferred.resolve(response); 
            })
            .error(function(err){
                console.log("Error -->", err);
            })

            return deferred.promise;
        };

        Accounts.listOfUsers = function() {
            var deferred = $q.defer();
            var listUrl  = accountsUrl + 'users/list';
            var access   = $sessionStorage.access;
            var token    = access.accessToken;
            var envId    = access.products[8].id;
            var params   = {
                accessToken: token,
                productId: envId
            }

            $http({
                method: 'GET', 
                url: listUrl,
                params: params
            })
            .success(function(response){
                deferred.resolve(response); 
            })
            .error(function(err){
                console.log("Error -->", err);
            })

            return deferred.promise;

        };

    	return Accounts;

    });
