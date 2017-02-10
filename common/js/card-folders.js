angular.module('moonshotApp')
    .factory('Folders',function ($q, Mfly) {
    	
    	// This Service gets the root level folders in Environment 
    	// giving users toggling access for 6 Card 'folders'
    	var Folders = {};

        Folders.getFolders = function() {
        	var deferred = $q.defer();
        	Mfly.getFolder('__root__').then(function(data){
		      
		      var folders = _.filter(data, function(item){
		        if (item.type === 'folder') {
		          return item;
		        }
		      });

		      deferred.resolve(folders);
		      
		      
		    });

		    return deferred.promise;
        };

        Folders.cardFolders = function() {
        	// This would be an object with the 6 folders that were selected
        };

    	return Folders;

    });
