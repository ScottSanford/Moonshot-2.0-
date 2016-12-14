angular.module('moonshotApp')
    .factory('Accounts', function($q, $http, $sessionStorage, Mfly) {
    
    	var Accounts = {};
        var accountsUrl  = "https://accounts.mediafly.com/api/3.0/";

        Accounts.getAccessToken = function(callback) {

        	Mfly.getInteractiveInfo().then(function(data){
                var accessUrl = accountsUrl + 'authentication/authenticate'
        		var user = data.user;
        		var pass = "Kiyo$aki123";
	        	var params = {
	        		username: user, 
	        		password: pass
	        	};

	        	$http({
	        		method: 'POST',
	        		url: accessUrl, 
	        		params: params
	        	})
                .success(function(data){
                    callback(data);
		        })
        	    .error(function(err){
        	  		callback(err);
        	    })
	        });


	    };

        Accounts.user = function() {
            var deferred = $q.defer();

            Accounts.getAccessToken(function(access){

                var token   = access.accessToken;
                var user    = access.emailAddress;
                
                var envId   = access.products[8].id;
                var params  = {
                    accessToken: token,
                    productId: envId,
                    username: user 
                }

                var userUrl = accountsUrl + 'users/get';

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
