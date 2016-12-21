angular.module('moonshotApp')
    .factory('Launchpad',function ($q, $http, $sessionStorage, Accounts, Upload) {
    
    	var Launchpad    = {};
    	var launchpadUrl = "https://launchpadapi.mediafly.com/2/items/";
        var contentSourceId = "f61ef3521a9b458eb757b619e2e4c39e"; // Sanford Designs

        Launchpad.getPresignedUrl = function(file, callback) {
            
            Accounts.getAccessToken(function(token){
        		var url = 'https://launchpadapi.mediafly.com/uploads/signedurl';

                var params = {
                    accessToken: token.accessToken,
                    productId: contentSourceId, 
                    contentType: file.type,
                    extension: file.ext
                };

        		$http({
        			method: 'GET', 
        			url: url, 
                    params:params, 
                    headers: {"Content-Type": file.type}
        		}).success(function(s3){
        			callback(s3)
        		})
        	});

        };



        Launchpad.uploadToS3 = function(signedUrl, file) {
            console.log(file.src);
            $http({
                method: 'PUT', 
                url: signedUrl, 
                headers: {
                    'Content-Type': file.type
                },
                data: file
            })
            .success(function(response){
                console.log(response);
            }).error(function(err){
                console.log(err);
            })

        };

        Launchpad.createItem = function(file) {
       
        	Accounts.getAccessToken(function(token){
                Launchpad.getPresignedUrl(file, function(s3){

                    var res         = s3.response;
                    var responseUrl = res.url;
                    var signedUrl   = res.signedUrl;

                    Launchpad.uploadToS3(signedUrl, file);                
             
        		    var createItemUrl = launchpadUrl + 'create';

                    var params = {
                        accessToken: token.accessToken,
                        productId: contentSourceId
                    };

                    var payload = {
                        metadata: {
                           title: file.name
                       },
                       type: 'file', 
                       asset: {
                           url: responseUrl, 
                           sourceType: 's3'
                       },
                       parentId: "0-myitems"      
                    };
                    
                    $http({
                        method: 'POST', 
                        url: createItemUrl, 
                        params: params, 
                        data: payload
                    })
                    .success(function(data, status, headers){
                        console.log("Created Item in Airship");
                    })
                    .error(function(res){
                        console.log('Unsuccessful Airship Item Creation!');
                    });
                });



        		
        	});
        };

    	return Launchpad;

    });
