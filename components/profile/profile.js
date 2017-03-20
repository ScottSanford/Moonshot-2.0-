angular.module('moonshotApp')

.controller('ProfileCtrl', function($scope, Mfly, Accounts){

  Mfly.getInteractiveInfo().then(function(data){
      Mfly.getAccessToken().then(function(token){
          var t = JSON.parse(token);
          Accounts.user(t.accessToken, data.user, t.environmentId).then(function(response){
            console.log(response);
            $scope.user = response;

            var groups = response.product.roles;
            $scope.groups = groups;
          });
      });
  });


});


