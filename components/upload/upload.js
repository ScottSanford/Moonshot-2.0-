angular.module('moonshotApp')

.controller('UploadCtrl', function($scope, Dialog){

    // MY ITEMS
    $scope.upload = function (file) {
      // monkey patch for ngf-select trigger too early
      if (file === null) {
        return;
      } else {
        Dialog.box('UploadItemCtrl', 'common/tmpls/uploader/uploader-dialog.html', null, file);
      }
    };


});


