angular.module('moonshotApp')

.controller('UploadItemCtrl', function(
    $scope, $q, $window, $timeout,
    item, Mfly, Launchpad, Accounts,
    $mdDialog, $mdToast, Upload, $cookies){
    
    var file = item;

    var ext = file.name.substr(file.name.lastIndexOf('.'));
    file['ext'] = ext;
    var name = file.name.substring(0, file.name.indexOf('.'));
    file['fileName'] = name;

    function getInt64Bytes(x){
        var bytes = [];
        var i = 8;
        do {
        bytes[--i] = x & (255);
        x = x>>8;
        } while ( i )
        console.log("bytes",bytes);
        return bytes;
    }

    function fileThumbnail(fileEntry) {
        var deferred = $q.defer();
        var reader = new FileReader();
        reader.onloadend = function(e) {
           var content = this.result;
           deferred.resolve(content);
        };

        reader.readAsDataURL(file);

        return deferred.promise;
    }

    file['src'] = getInt64Bytes(file.size);

    var files = [];
    fileThumbnail(file).then(function(data){
        file['imgSrc'] = data;
        files.push(file);
        $scope.files = files;
    });

    console.log('file', file);

    function getRandomLoadTime(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initUploadToLaunchpad() {
        Mfly.getCredentials().then(function(creds){
            
            $scope.isUploadingItem = true;
            
            Launchpad.getPresignedUrl(creds.accessToken, file)
                .then(function(s3){

                    Launchpad.createItem(creds.accessToken, s3, file);
                        // hide loading bar
                        $timeout(function(){
                            $scope.isUploadingItem = false;

                            $mdDialog.cancel();

                            $mdToast.show(
                              $mdToast.simple()
                                .textContent(`${file.name} uploaded successfully!`)
                                .position('top right')
                                .hideDelay(5000)
                            );

                        }, getRandomLoadTime(1500,3500));

                    });
              
        })
    }

    initUploadToLaunchpad();
    ////////////////////////////////////////////////

	$scope.closeDialog = function() {
		$mdDialog.cancel();
	};

});