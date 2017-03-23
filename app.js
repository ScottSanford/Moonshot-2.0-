angular.module("moonshotApp", [
        'ui.router', 
        'myFilters', 
        'myDirectives',
        'ui.bootstrap', 
        'ngclipboard', 
        'ui.sortable', 
        'ngStorage', 
        'ngAnimate', 
        'ngMaterial', 
        'ngMdIcons', 
        'md.data.table', 
        'dark-sky', 
        'angularMoment', 
        'ngFileUpload', 
        'angularFileUpload', 
        'ngCookies'
    ])

    .constant('version', '2.0.0')
    .run(function(version, $rootScope){
        $rootScope = version;
    })

    .config(function ($compileProvider, $stateProvider, $urlRouterProvider, darkSkyProvider) { 

          darkSkyProvider.setApiKey('a0eb9b7587d7bcaf6e9e06bffc6cfdfc');
          darkSkyProvider.setUnits('us');
          darkSkyProvider.setLanguage('en');

          $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:|https:\/\/|http:\/\/|data:image)/);

          // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("/dashboard");
          
          $stateProvider
                .state('dashboard', {
                    url: '/dashboard', 
                    templateUrl: 'components/dashboard/dashboard.html',                    
                    controller: 'DashboardCtrl'
                })
                
                .state('hierarchy', {
                    url: '/hierarchy', 
                    templateUrl: 'components/hierarchy/hierarchy.html', 
                    controller: 'HierachyCtrl'
                })
                .state('hierarchy-details', {
                    url: '/hierarchy/:hid', 
                    templateUrl: 'components/hierarchy-details/hierarchy-details.html', 
                    controller: 'HierachyDetailsCtrl'
                })
                .state('collections', {
                    url: '/collections', 
                    templateUrl: 'components/collections/collections.html', 
                    controller: 'CollectionsCtrl'
                })
                .state('details', {
                    url: '/collection-details/:cid', 
                    templateUrl: 'components/collection-details/collection-details.html', 
                    controller: 'CollectionDetailCtrl'
                })
                .state('present', {
                    url: '/cards',
                    templateUrl: 'components/cards/cards.html', 
                    controller: 'CardsCtrl'
                })
                .state('presentation', {
                    url: '/presentation/{slug}?collection&page&type', 
                    templateUrl: 'components/presentation/presentation.html',                    
                    controller: 'PresentationCtrl'
                })
                .state('search', {
                    url: '/search/:term', 
                    templateUrl: 'components/search/search.html', 
                    controller: 'SearchCtrl'
                })
                .state('settings', {
                    url: '/settings', 
                    templateUrl: 'components/settings/settings.html',                    
                    controller: 'SettingsCtrl'
                })
                .state('upload', {
                    url: '/upload', 
                    templateUrl: 'components/upload/upload.html',                    
                    controller: 'UploadCtrl'
                })

                .state('profile', {
                    url: '/profile', 
                    templateUrl: 'components/profile/profile.html',                    
                    controller: 'ProfileCtrl'
                })

                .state('timeline', {
                    url: '/timeline', 
                    templateUrl: 'components/timeline/timeline.html',                    
                    controller: 'TimelineCtrl'
                })

    });
        