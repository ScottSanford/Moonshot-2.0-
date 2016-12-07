angular.module('moonshotApp')

.factory('Mfly', function($q){

	var mfly = {

        createCollection: function(collectionName) {
            var deferred = $q.defer();

            mflyCommands.createCollection(collectionName)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        },

        addItemToCollection: function(collectionId, itemId) {
            var deferred = $q.defer();

            mflyCommands.addItemToCollection(collectionId, itemId)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        },

        reorderItemInCollection: function(collectionId, itemId, position) {
            var deferred = $q.defer();

            mflyCommands.reorderItemInCollection(collectionId, itemId, position)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        },

        getCollection: function(collectionId) {
            var deferred = $q.defer();

            mflyCommands.getCollection(collectionId)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        },        

        getCollections: function() {
            var deferred = $q.defer();

            mflyCommands.getCollections()
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise;
        },        

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
        }, 

        embed: function(element, id, page) {
            var deferred = $q.defer();

             mflyCommands.embed(element, id, page)
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise; 
        }, 

        getLastViewedContent: function() {
            var deferred = $q.defer();

             mflyCommands.getLastViewedContent()
                .done(function(data){
                    deferred.resolve(data);
                });

            return deferred.promise; 
        }
	}

	return mfly;
	
});