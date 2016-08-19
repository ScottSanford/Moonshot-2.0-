angular.module('myFilters', [])

.filter('underline', function () {
    return function (text) {

        var t =  '<u>'+text+'</u>';
        return t;
    };
});















