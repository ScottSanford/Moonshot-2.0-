angular.module('moonshotApp')
    .factory('Dialog',function ($mdDialog) {
    
    	var Dialog = {};

        Dialog.box = function(ctrl, tmpls, ev, local) {
    		
            $mdDialog.show({
              controller: ctrl,
              templateUrl: tmpls,
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true, 
              locals: {
                item: local
              }
            });

        };

    	return Dialog;

    });
