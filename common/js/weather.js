angular.module('moonshotApp')
    .factory('Weather',function ($http, $q, darkSky) {
    	
    	var Weather = {};

        Weather.getCurrentLocation = function() {
            var deferred = $q.defer();
            var geocoder = new google.maps.Geocoder();

            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude
                var latlng = new google.maps.LatLng(lat, lng);

                geocoder.geocode({
                    'location': latlng 
                }, function(results, status){
                    deferred.resolve(results);
                })
                
            });

            return deferred.promise;
        };

        Weather.getCurrent = function() {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude

                darkSky.getCurrent(lat, lng).then(function(data){
                    
                    deferred.resolve(data);
                });
            });

            return deferred.promise;
        };

        Weather.getDaily = function() {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude

                darkSky.getDailyForecast(lat, lng).then(function(data){
                    
                    deferred.resolve(data);

                });
            });

            return deferred.promise;
        };

    	return Weather;

    });
