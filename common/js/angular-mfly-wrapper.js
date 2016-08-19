angular.module('moonshotApp')

.factory('Mfly', function($q){

	var mfly = {

        getInteractiveInfo: function() {
             var deferred = $q.defer();

            mflyCommands.getInteractiveInfo()
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        },

        getData: function(id) {
            var deferred = $q.defer();

            mflyCommands.getData(id)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        }, 

        getFolder: function(id) {
            var deferred = $q.defer();

            mflyCommands.getFolder(id)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;        	
        }, 

        search: function(term) {
            var deferred = $q.defer();

            mflyCommands.search(term)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;    
        },     

        getItem: function(id) {
            var deferred = $q.defer();

            mflyCommands.getItem(id)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;    
        }, 

        openItem: function(id) {
            var deferred = $q.defer();

            mflyCommands.openItem(id)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;             
        }, 

        getShare: function(id) {
            var deferred = $q.defer();

             mflyCommands.getShare(id)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise; 
        }
	}

	return mfly;
	
});