angular.module('moonshotApp')
    .factory('Weather',function ($http, $q, darkSky) {
    	
    	var Weather = {};

        Weather.getCurrentLocation = function() {
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude
                var latlng = lat + ',' + lng;

                var apiKey = 'AIzaSyDsX8nXmIhbNOchioaaGj-1Wn9RH6L4S14';

                var gURL = "https://maps.googleapis.com/maps/api/geocode/json";

                var params = {
                    latlng: latlng, 
                    key: apiKey
                };

                $http({
                    method: 'GET', 
                    url: gURL, 
                    params: params
                }).success(function(results){
                    deferred.resolve(results);
                });
                
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
