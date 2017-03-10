angular.module('myFilters', [])

.filter('underline', function () {
    return function (text) {

        var t =  '<u>'+text+'</u>';
        return t;
    };
})

.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
})

.filter("matchMedia", function($window) {
    return function matchMedia (mediaQueryString) {
        return $window.matchMedia(mediaQueryString).matches;
    }
});














