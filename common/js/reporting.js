angular.module('moonshotApp')
    .factory('Reporting', function($q, $http, $sessionStorage, Mfly) {
    
    	var Reporting = {};

    	var warehouse  = "https://warehouseapi.mediafly.com/";
        var reportData = "reports/data";

        // YOU MUST HAVE REPORTING ACCESS INSIDE OF AIRSHIP

        Reporting.summary = function(token) {
            var summaryUrl = warehouse + 'summary';

            var params = {
                accessToken: token, 
                // productId: "f61ef3521a9b458eb757b619e2e4c39e", // Sanford Designs
                productId: 'f7e484d0e3ee4e87901ee34fe2fcbe1a', // Inside Mediafly
                daterangefrom: "11/01/2016",
                daterangeto: "1/20/2017"
            }
            $http({
                method: "GET",
                url: summaryUrl, 
                params: params
            }).success(function(response){
                console.log("Summary: ", response);
            }).error(function(response){
                console.log("Something went wrong :: ", response);
            })
        };


        Reporting.viewsByUser = function(token) {

            var viewByUserUrl = warehouse + 'reports/data/ViewsByUser';

            var params = {
                accessToken: token, 
                productId: "f61ef3521a9b458eb757b619e2e4c39e", // Sanford Designs
                daterangefrom: "11/01/2016",
                daterangeto: "1/20/2017"
            }
            $http({
                method: "GET",
                url: viewByUserUrl, 
                params: params
            }).success(function(response){
                console.log("ViewsByUser:  ", response);
            }).error(function(response){
                console.log("Something went wrong :: ", response);
            })
        };


        

    	return Reporting;

    });
