angular.module('moonshotApp')

.controller('ProfileCtrl', function($scope, Mfly, Accounts){

  // using getInteractiveInfo to get username
  Mfly.getInteractiveInfo().then(function(data){
      // using getCredentials to get accessToken and environmentID
      Mfly.getCredentials().then(function(creds){
            console.log("creds", creds);

          // using Accounts API to get info on user
          // hardcoding InsideMediafly environment until mflyCommands.getCreds() call is fixed for iOS
          var contentSourceId = "f7e484d0e3ee4e87901ee34fe2fcbe1a";
          Accounts.user(creds.accessToken, data.user, contentSourceId).then(function(response){
            console.log("profile", response);
            $scope.user = response;

            var groups = response.product.roles;
            $scope.groups = groups;
            
          });

      });
  });


});


