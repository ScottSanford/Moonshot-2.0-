angular.module('moonshotApp')

.controller('UploadItemCtrl', function($scope, $q, $window, item, Mfly, Launchpad, $mdDialog, $mdToast, Upload){
    
    var file = item;

    var ext = file.name.substr(file.name.lastIndexOf('.'));
    file['ext'] = ext;


    function getInt64Bytes(x){
        var bytes = [];
        var i = 8;
        do {
        bytes[--i] = x & (255);
        x = x>>8;
        } while ( i )
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

    fileThumbnail(file).then(function(data){
        file['imgSrc'] = data;
    });

    var files = [];
    files.push(file);
    console.log(files);
    $scope.files = files;


    $scope.uploadFile = function(file) {
        console.log("file upload button", file);
        // Launchpad.createItem(file);
    };

	$scope.closeDialog = function() {
		$mdDialog.cancel();
	};

});