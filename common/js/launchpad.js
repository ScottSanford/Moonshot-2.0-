angular.module('moonshotApp')
    .factory('Launchpad',function ($q, $http, $sessionStorage) {
    
    	var Launchpad    = {};
    	var launchpadUrl = "https://launchpadapi.mediafly.com/2/items/";
    	var access       = $sessionStorage.access;

        Launchpad.getAccessToken = function(cb) {
        	cb(access.accessToken);
        };

        Launchpad.getPresignedUrl = function() {
			
        	Launchpad.getAccessToken(function(token){
        		var productId = "f61ef3521a9b458eb757b619e2e4c39";
        		var url = 'https://launchpadapi.mediafly.com/uploads/signedurl?accessToken=' + token + '&productid=' + productId;
        		$http({
        			method: 'POST', 
        			url: url,
        			json: true
        		}).success(function(response){
        			console.log(response);
        		})
        	});

        };

        Launchpad.createItem = function(type) {
        	Launchpad.getAccessToken(function(token){
        		var url = launchpadUrl + 'create';
        		var envId = "f61ef3521a9b458eb757b619e2e4c39";
        		var parent = envId + 'productmyitems';
        		var params = {
        			accessToken: token, 
        			productId: envId,
        			type: type,
        			name: 'Moonshot Folder', 
        			parentId: parent, 
        			folderCount: 0, 
        			fileCount: 0
        		};

        		$http({
        			method: 'POST', 
        			url: url,
        			params: params
        		}).success(function(response){
        			console.log(response);
        		})
        	});
        }

    	return Launchpad;

    });
